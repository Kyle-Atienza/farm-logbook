import express from 'express';
import cors from 'cors';

import {
    getAllHarvests,
    getHarvestById,
    createHarvest,
    updateHarvestById,
    deleteHarvestById
} from './harvests';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/harvests', async (req, res) => {
    const data = await getAllHarvests();
    res.json(data);
});

app.get('/harvests/:id', async (req, res) => {
    const h = await getHarvestById(req.params.id);
    if (!h) return res.status(404).json({ error: 'Harvest not found' });
    res.json(h);
});

app.post('/harvests', async (req, res) => {
    const created = await createHarvest(req.body || {});
    res.status(201).json(created);
});

app.put('/harvests/:id', async (req, res) => {
    const updated = await updateHarvestById(req.params.id, req.body || {});
    if (!updated) return res.status(404).json({ error: 'Harvest not found' });
    res.json(updated);
});

app.delete('/harvests/:id', async (req, res) => {
    const ok = await deleteHarvestById(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Harvest not found' });
    res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`);
});
