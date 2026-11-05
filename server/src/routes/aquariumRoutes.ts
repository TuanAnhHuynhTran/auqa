import { Router } from 'express';
import { databaseEnabled } from '../config/database.js';
import { Aquarium } from '../models/Aquarium.js';
import seedAquariums from '../data/aquariums.json' with { type: 'json' };

export const aquariumRoutes = Router();
type Stored = { id: string; name: string; description?: string; tankSize?: string; config: Record<string, unknown>; objects: object[]; createdAt: string; updatedAt: string };
const memory: Stored[] = structuredClone(seedAquariums) as Stored[];
const valid = (body: any) => body && typeof body.name === 'string' && body.name.trim().length >= 2 && body.config && typeof body.config === 'object' && Array.isArray(body.objects) && [body.config.dimensions?.length, body.config.dimensions?.width, body.config.dimensions?.height].every((n) => typeof n === 'number');

aquariumRoutes.get('/', async (_req, res) => res.json(databaseEnabled ? await Aquarium.findAll({ order: [['updatedAt', 'DESC']] }) : memory));
aquariumRoutes.get('/:id', async (req, res) => { const id = String(req.params.id); const item = databaseEnabled ? await Aquarium.findByPk(id) : memory.find((entry) => entry.id === id); return item ? res.json(item) : res.status(404).json({ message: 'Không tìm thấy hồ cá' }); });
aquariumRoutes.post('/', async (req, res) => {
  if (!valid(req.body)) return res.status(400).json({ message: 'Dữ liệu hồ cá không hợp lệ' });
  if (databaseEnabled) return res.status(201).json(await Aquarium.create({ id: req.body.id, name: req.body.name.trim(), config: req.body.config, objects: req.body.objects }));
  const now = new Date().toISOString(); const item: Stored = { id: req.body.id || crypto.randomUUID(), name: req.body.name.trim(), config: structuredClone(req.body.config), objects: structuredClone(req.body.objects), createdAt: now, updatedAt: now }; memory.unshift(item); return res.status(201).json(item);
});
aquariumRoutes.put('/:id', async (req, res) => {
  const id = String(req.params.id); if (!valid(req.body)) return res.status(400).json({ message: 'Dữ liệu hồ cá không hợp lệ' });
  if (databaseEnabled) { const item = await Aquarium.findByPk(id); if (!item) return res.status(404).json({ message: 'Không tìm thấy hồ cá' }); await item.update({ name: req.body.name.trim(), config: req.body.config, objects: req.body.objects }); return res.json(item); }
  const index = memory.findIndex((entry) => entry.id === id); if (index < 0) return res.status(404).json({ message: 'Không tìm thấy hồ cá' }); memory[index] = { ...memory[index], name: req.body.name.trim(), config: structuredClone(req.body.config), objects: structuredClone(req.body.objects), updatedAt: new Date().toISOString() }; return res.json(memory[index]);
});
aquariumRoutes.delete('/:id', async (req, res) => { const id = String(req.params.id); if (databaseEnabled) return (await Aquarium.destroy({ where: { id } })) ? res.status(204).send() : res.status(404).json({ message: 'Không tìm thấy hồ cá' }); const index = memory.findIndex((entry) => entry.id === id); if (index < 0) return res.status(404).json({ message: 'Không tìm thấy hồ cá' }); memory.splice(index, 1); return res.status(204).send(); });
