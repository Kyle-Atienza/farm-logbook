import { Bot, Context, session, webhookCallback } from "grammy";
import { Menu } from "@grammyjs/menu";
import { config } from "dotenv";
config();
// Create an instance of the `Bot` class and pass your bot token to it.
const token = process.env.BOT_TOKEN;
if (!token)
    throw new Error("BOT_TOKEN is unset");
// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot(token); // <-- put your bot token between the ""
// export default webhookCallback(bot, "https");
// Use session middleware
bot.use(session({ initial: () => ({ state: 'idle' }) }));
// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.
// Handle the /start command.
const menu = new Menu("my-menu-identifier")
    .text("Log Harvests", (ctx) => {
    ctx.session.state = 'waiting_for_harvest_amount';
    ctx.reply("How much did you harvest for today? Please input in grams.");
}).row()
    .text("View Records", (ctx) => {
    ctx.session.state = 'waiting_for_view_option';
    ctx.reply("Choose an option:", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Past 7 days", callback_data: "view_7days" }],
                [{ text: "Harvest per week", callback_data: "view_week" }],
                [{ text: "Harvest per month", callback_data: "view_month" }]
            ]
        }
    });
});
// Make it interactive.
bot.use(menu);
bot.command("start", async (ctx) => {
    // Send the menu.
    await ctx.reply("What do you want to do next?", { reply_markup: menu });
});
// Handle the /me command to return user details (including Telegram ID)
bot.command("me", async (ctx) => {
    const from = ctx.from;
    if (!from) {
        await ctx.reply("Could not determine user information.");
        return;
    }
    const id = from.id;
    const username = from.username ?? 'N/A';
    const first = from.first_name ?? '';
    const last = from.last_name ?? '';
    await ctx.reply(`Your Telegram ID: ${id}\nUsername: ${username}\nName: ${first} ${last}`);
});
// Handle callback queries for view options
bot.on("callback_query:data", (ctx) => {
    const data = ctx.callbackQuery.data;
    if (data === 'view_7days') {
        // tbc fetch from BE
        ctx.reply("Data for past 7 days: (tbc)");
    }
    else if (data === 'view_week') {
        ctx.reply("Data for harvest per week: (tbc)");
    }
    else if (data === 'view_month') {
        ctx.reply("Data for harvest per month: (tbc)");
    }
    ctx.session.state = 'idle';
    ctx.answerCallbackQuery();
});
// Handle other messages.
bot.on("message", async (ctx) => {
    const session = ctx.session;
    if (session.state === 'waiting_for_harvest_amount') {
        const amount = parseFloat(ctx.message.text);
        if (isNaN(amount)) {
            ctx.reply("Please enter a valid number.");
            return;
        }
        session.harvestAmount = amount;
        session.state = 'waiting_for_confirmation';
        ctx.reply(`You entered ${amount} grams. Is this correct? Reply with Yes or No.`);
    }
    else if (session.state === 'waiting_for_confirmation') {
        const text = ctx.message.text.toLowerCase();
        if (text === 'yes') {
            // tbc send to BE
            const createHarvest = async (tgId, quantity) => {
                let employeeId = 1;
                /* const employee = await fetch(`${process.env.BASE_URL}/employees/tg/${tgId}`)
                if (!employee.ok) {
                    const newEmployee = await fetch(`${process.env.BASE_URL}/employees`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ tgId })
                    });
                    if (!newEmployee.ok) throw new Error('Failed to create employee');
                    const createdEmployee: Employee = await newEmployee.json() as Employee;
                    employeeId = createdEmployee.id;
                } else {
                    const existingEmployee: Employee = await employee.json() as Employee;
                    employeeId = existingEmployee.id;
                } */
                const harvestResponse = await fetch(`${process.env.BASE_URL}/harvests`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ loggedBy: employeeId, quantity })
                });
                if (!harvestResponse.ok)
                    throw new Error(`Failed to create harvest: ${await harvestResponse.text()} `);
                return await harvestResponse.json();
            };
            const createdHarvest = await createHarvest(ctx.from.id, session.harvestAmount);
            ctx.reply(`Harvest logged successfully!!\n
Quantity(g): ${createdHarvest.quantity}
Date: ${new Date(createdHarvest.createdAt).toLocaleDateString()}
Time: ${new Date(createdHarvest.createdAt).toLocaleTimeString()}`);
            session.state = 'idle';
        }
        else if (text === 'no') {
            session.state = 'waiting_for_harvest_amount';
            ctx.reply("Please input the correct amount again.");
        }
        else {
            ctx.reply("Please reply with Yes or No.");
        }
    }
    else {
        ctx.reply("Got another message!!!");
    }
});
// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.
// Start the bot.
bot.start();
//# sourceMappingURL=bot.js.map