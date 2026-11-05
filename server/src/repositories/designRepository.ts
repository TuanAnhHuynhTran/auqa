import { databaseEnabled } from '../config/database.js';
import { AquariumDesign } from '../models/AquariumDesign.js';

interface DesignInput { name: string; description?: string; tankSize: 'compact' | 'classic' | 'panorama'; objects: object[] }
type MemoryDesign = DesignInput & { id: string; createdAt: Date; updatedAt: Date };
const memory: MemoryDesign[] = [];

export const designRepository = {
  async list() { return databaseEnabled ? AquariumDesign.findAll({ order: [['updatedAt', 'DESC']] }) : memory; },
  async find(id: string) { return databaseEnabled ? AquariumDesign.findByPk(Number(id)) : memory.find((x) => x.id === id) ?? null; },
  async create(input: DesignInput) { if (databaseEnabled) return AquariumDesign.create(input); const now = new Date(); const item = { ...input, description: input.description ?? '', id: crypto.randomUUID(), createdAt: now, updatedAt: now }; memory.unshift(item); return item; },
  async remove(id: string) { if (databaseEnabled) return (await AquariumDesign.destroy({ where: { id: Number(id) } })) > 0; const index = memory.findIndex((x) => x.id === id); if (index < 0) return false; memory.splice(index, 1); return true; },
};
