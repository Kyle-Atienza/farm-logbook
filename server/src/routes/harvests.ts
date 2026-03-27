import { Router, Request, Response } from 'express';
import {
    getAllHarvests,
    getHarvestById,
    createHarvest,
    updateHarvestById,
    deleteHarvestById
} from '../services/harvests';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const data = await getAllHarvests();
    res.json(data);
});

router.get('/:id', async (req: Request, res: Response) => {
    const h = await getHarvestById(req.params.id);
    if (!h) return res.status(404).json({ error: 'Harvest not found' });
    res.json(h);
});

router.post('/', async (req: Request, res: Response) => {
    const created = await createHarvest(req.body || {});
    res.status(201).json(created);
});

router.put('/:id', async (req: Request, res: Response) => {
    const updated = await updateHarvestById(req.params.id, req.body || {});
    if (!updated) return res.status(404).json({ error: 'Harvest not found' });
    res.json(updated);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const ok = await deleteHarvestById(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Harvest not found' });
    res.status(204).end();
});

export default router;
