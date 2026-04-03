import { Router, Request, Response } from 'express';
import {
    getAllHarvests,
    getHarvestById,
    createHarvest,
    updateHarvestById,
    deleteHarvestById
} from '../services/harvests';

const router = Router();

/**
 * @swagger
 * /harvests:
 *   get:
 *     summary: Get all harvests
 *     tags: [Harvests]
 *     responses:
 *       200:
 *         description: List of all harvests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Harvest'
 */
router.get('/', async (req: Request, res: Response) => {
    const data = await getAllHarvests();
    res.json(data);
});

/**
 * @swagger
 * /harvests/{id}:
 *   get:
 *     summary: Get a harvest by ID
 *     tags: [Harvests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Harvest ID
 *     responses:
 *       200:
 *         description: Harvest details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Harvest'
 *       404:
 *         description: Harvest not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'Harvest ID is required' });

    const h = await getHarvestById(id);
    if (!h) return res.status(404).json({ error: 'Harvest not found' });
    res.json(h);
});

/**
 * @swagger
 * /harvests:
 *   post:
 *     summary: Create a new harvest
 *     tags: [Harvests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HarvestCreate'
 *     responses:
 *       201:
 *         description: Harvest created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Harvest'
 */
router.post('/', async (req: Request, res: Response) => {
    const created = await createHarvest(req.body || {});
    res.status(201).json(created);
});

/**
 * @swagger
 * /harvests/{id}:
 *   put:
 *     summary: Update a harvest by ID
 *     tags: [Harvests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Harvest ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HarvestUpdate'
 *     responses:
 *       200:
 *         description: Harvest updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Harvest'
 *       404:
 *         description: Harvest not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'Harvest ID is required' });

    const updated = await updateHarvestById(id, req.body || {});
    if (!updated) return res.status(404).json({ error: 'Harvest not found' });
    res.json(updated);
});

/**
 * @swagger
 * /harvests/{id}:
 *   delete:
 *     summary: Delete a harvest by ID
 *     tags: [Harvests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Harvest ID
 *     responses:
 *       204:
 *         description: Harvest deleted successfully
 *       404:
 *         description: Harvest not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'Harvest ID is required' });

    const ok = await deleteHarvestById(id);
    if (!ok) return res.status(404).json({ error: 'Harvest not found' });
    res.status(204).end();
});

export default router;
