const express = require('express');
const cors = require('cors');
const {
    getAllHarvests,
    getHarvestById,
    createHarvest,
    updateHarvestById,
    deleteHarvestById
} = require('./harvests');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/harvests', (req, res) => {
    res.json(getAllHarvests());
});

app.get('/harvests/:id', (req, res) => {
    const h = getHarvestById(req.params.id);
    if (!h) return res.status(404).json({ error: 'Harvest not found' });
    res.json(h);
});

app.post('/harvests', (req, res) => {
    const created = createHarvest(req.body || {});
    res.status(201).json(created);
});

app.put('/harvests/:id', (req, res) => {
    const updated = updateHarvestById(req.params.id, req.body || {});
    if (!updated) return res.status(404).json({ error: 'Harvest not found' });
    res.json(updated);
});

app.delete('/harvests/:id', (req, res) => {
    const ok = deleteHarvestById(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Harvest not found' });
    res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
