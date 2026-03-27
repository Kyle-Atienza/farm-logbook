import { Router, Request, Response } from 'express';
import {
    getAllEmployees,
    getEmployeeById,
    getEmployeeByTgId,
    createEmployee,
    updateEmployeeById,
    deleteEmployeeById
} from '../services/employees';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const data = await getAllEmployees();
    res.json(data);
});

// lookup by Telegram ID (tgId)
router.get('/tg/:tgId', async (req: Request, res: Response) => {
    const e = await getEmployeeByTgId(req.params.tgId);
    if (!e) return res.status(404).json({ error: 'Employee not found' });
    res.json(e);
});

router.get('/:id', async (req: Request, res: Response) => {
    const e = await getEmployeeById(req.params.id);
    if (!e) return res.status(404).json({ error: 'Employee not found' });
    res.json(e);
});

router.post('/', async (req: Request, res: Response) => {
    const created = await createEmployee(req.body || {});
    res.status(201).json(created);
});

router.put('/:id', async (req: Request, res: Response) => {
    const updated = await updateEmployeeById(req.params.id, req.body || {});
    if (!updated) return res.status(404).json({ error: 'Employee not found' });
    res.json(updated);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const ok = await deleteEmployeeById(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Employee not found' });
    res.status(204).end();
});

export default router;
