import { Router } from 'express';
import templates from '../data/aquarium-templates.json' with { type: 'json' };

export const templateRoutes = Router();

templateRoutes.get('/', (_req, res) => res.json(templates));
templateRoutes.get('/:id', (req, res) => {
  const template = templates.find((item) => item.id === String(req.params.id));
  if (!template) return res.status(404).json({ message: 'Không tìm thấy mẫu hồ' });
  return res.json(template);
});
