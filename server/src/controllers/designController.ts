import type { Request, Response } from 'express';
import { designRepository } from '../repositories/designRepository.js';

const validSizes = new Set(['compact', 'classic', 'panorama']);
export async function listDesigns(_req: Request, res: Response) { res.json(await designRepository.list()); }
export async function getDesign(req: Request, res: Response) { const item = await designRepository.find(String(req.params.id)); if (!item) return res.status(404).json({ message: 'Không tìm thấy thiết kế' }); res.json(item); }
export async function createDesign(req: Request, res: Response) {
  const { name, description = '', tankSize, objects } = req.body;
  if (typeof name !== 'string' || name.trim().length < 2 || !validSizes.has(tankSize) || !Array.isArray(objects)) return res.status(400).json({ message: 'Dữ liệu thiết kế không hợp lệ' });
  const item = await designRepository.create({ name: name.trim(), description, tankSize, objects }); res.status(201).json(item);
}
export async function deleteDesign(req: Request, res: Response) { const removed = await designRepository.remove(String(req.params.id)); if (!removed) return res.status(404).json({ message: 'Không tìm thấy thiết kế' }); res.status(204).send(); }
