"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllHarvests = getAllHarvests;
exports.getHarvestById = getHarvestById;
exports.createHarvest = createHarvest;
exports.updateHarvestById = updateHarvestById;
exports.deleteHarvestById = deleteHarvestById;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getAllHarvests() {
    return prisma.harvest.findMany({ orderBy: { id: 'asc' } });
}
async function getHarvestById(id) {
    const numId = Number(id);
    return prisma.harvest.findUnique({ where: { id: numId } });
}
async function createHarvest(data) {
    const payload = {
        name: data.name ?? null,
        quantity: data.quantity != null ? Number(data.quantity) : null,
        notes: data.notes ?? null
    };
    return prisma.harvest.create({ data: payload });
}
async function updateHarvestById(id, data) {
    const numId = Number(id);
    try {
        const payload = {};
        if (data.name !== undefined)
            payload.name = data.name;
        if (data.quantity !== undefined)
            payload.quantity = data.quantity === null ? null : Number(data.quantity);
        if (data.notes !== undefined)
            payload.notes = data.notes;
        return await prisma.harvest.update({ where: { id: numId }, data: payload });
    }
    catch (e) {
        return null;
    }
}
async function deleteHarvestById(id) {
    const numId = Number(id);
    try {
        await prisma.harvest.delete({ where: { id: numId } });
        return true;
    }
    catch (e) {
        return false;
    }
}
