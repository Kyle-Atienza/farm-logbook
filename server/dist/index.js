"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const harvests_1 = require("./harvests");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/harvests', async (req, res) => {
    const data = await (0, harvests_1.getAllHarvests)();
    res.json(data);
});
app.get('/harvests/:id', async (req, res) => {
    const h = await (0, harvests_1.getHarvestById)(req.params.id);
    if (!h)
        return res.status(404).json({ error: 'Harvest not found' });
    res.json(h);
});
app.post('/harvests', async (req, res) => {
    const created = await (0, harvests_1.createHarvest)(req.body || {});
    res.status(201).json(created);
});
app.put('/harvests/:id', async (req, res) => {
    const updated = await (0, harvests_1.updateHarvestById)(req.params.id, req.body || {});
    if (!updated)
        return res.status(404).json({ error: 'Harvest not found' });
    res.json(updated);
});
app.delete('/harvests/:id', async (req, res) => {
    const ok = await (0, harvests_1.deleteHarvestById)(req.params.id);
    if (!ok)
        return res.status(404).json({ error: 'Harvest not found' });
    res.status(204).end();
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`);
});
