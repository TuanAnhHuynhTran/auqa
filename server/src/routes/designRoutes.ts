import { Router } from 'express';
import { createDesign, deleteDesign, getDesign, listDesigns } from '../controllers/designController.js';
export const designRoutes = Router();
designRoutes.get('/', listDesigns); designRoutes.get('/:id', getDesign); designRoutes.post('/', createDesign); designRoutes.delete('/:id', deleteDesign);
