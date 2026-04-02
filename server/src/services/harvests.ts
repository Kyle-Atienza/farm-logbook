import { Harvest, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllHarvests(): Promise<Harvest[]> {
    return prisma.harvest.findMany({ orderBy: { id: 'asc' } });
}

export async function getHarvestById(id: string | number): Promise<Harvest | null> {
    const numId = Number(id);
    return prisma.harvest.findUnique({ where: { id: numId } });
}

export async function createHarvest(data: any): Promise<Harvest> {
    const payload: any = {
        quantity: data.quantity != null ? Number(data.quantity) : null,
        loggedBy: data.loggedBy != null ? Number(data.loggedBy) : null,
    };
    return prisma.harvest.create({ data: payload });
}

export async function updateHarvestById(id: string | number, data: any): Promise<Harvest | null> {
    const numId = Number(id);
    try {
        const payload: any = {};
        if (data.name !== undefined) payload.name = data.name;
        if (data.quantity !== undefined) payload.quantity = data.quantity === null ? null : Number(data.quantity);
        if (data.notes !== undefined) payload.notes = data.notes;
        return await prisma.harvest.update({ where: { id: numId }, data: payload });
    } catch (e) {
        return null;
    }
}

export async function deleteHarvestById(id: string | number): Promise<boolean> {
    const numId = Number(id);
    try {
        await prisma.harvest.delete({ where: { id: numId } });
        return true;
    } catch (e) {
        return false;
    }
}
