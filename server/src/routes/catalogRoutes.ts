import { Router } from 'express';
import { databaseEnabled } from '../config/database.js';
import { CatalogItem } from '../models/CatalogItem.js';
export const catalogRoutes = Router();
const sample = [
  { id: 'neon', kind: 'fish', name: 'Cá Neon Xanh', description: 'Sắc xanh điện nổi bật.', color: '#2de2e6', price: 120, rarity: 'Phổ biến', icon: '✦' },
  { id: 'clown', kind: 'fish', name: 'Cá Hề Ocellaris', description: 'Tinh nghịch và thân thiện.', color: '#ff8a3d', price: 280, rarity: 'Phổ biến', icon: '◒' },
  { id: 'anubias', kind: 'plant', name: 'Ráy Nana', description: 'Cây thủy sinh khỏe.', color: '#36c879', price: 85, rarity: 'Phổ biến', icon: '♧' },
];
catalogRoutes.get('/', async (_req, res) => res.json(databaseEnabled ? await CatalogItem.findAll({ where: { active: true } }) : sample));
