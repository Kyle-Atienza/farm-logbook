import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function serializeEmployee(e: any) {
    if (!e) return e;
    return Object.assign({}, e, { tgId: e.tgId === null ? null : String(e.tgId) });
}

export async function getAllEmployees() {
    const rows = await prisma.employee.findMany({ orderBy: { id: 'asc' } });
    return rows.map(serializeEmployee);
}

export async function getEmployeeById(id: string | number) {
    const numId = Number(id);
    const row = await prisma.employee.findUnique({ where: { id: numId } });
    return serializeEmployee(row);
}

export async function createEmployee(data: any) {
    const payload: any = {
        tgId: data.tgId != null ? String(data.tgId) : null,
        name: data.name ?? ''
    };
    const created = await prisma.employee.create({ data: payload });
    return serializeEmployee(created);
}

export async function updateEmployeeById(id: string | number, data: any) {
    const numId = Number(id);
    try {
        const payload: any = {};
        if (data.tgId !== undefined) payload.tgId = data.tgId === null ? null : String(data.tgId);
        if (data.name !== undefined) payload.name = data.name;
        const updated = await prisma.employee.update({ where: { id: numId }, data: payload });
        return serializeEmployee(updated);
    } catch (e) {
        return null;
    }
}

export async function deleteEmployeeById(id: string | number) {
    const numId = Number(id);
    try {
        await prisma.employee.delete({ where: { id: numId } });
        return true;
    } catch (e) {
        return false;
    }
}
