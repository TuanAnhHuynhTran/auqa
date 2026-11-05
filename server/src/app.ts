import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { designRoutes } from './routes/designRoutes.js';
import { catalogRoutes } from './routes/catalogRoutes.js';
import { templateRoutes } from './routes/templateRoutes.js';
import { aquariumRoutes } from './routes/aquariumRoutes.js';

export const app = express();
app.use(helmet()); app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173' })); app.use(express.json({ limit: '1mb' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'AquaVerse API', timestamp: new Date().toISOString() }));
app.use('/api/designs', designRoutes); app.use('/api/catalog', catalogRoutes);
app.use('/api/aquarium-templates', templateRoutes);
app.use('/api/aquariums', aquariumRoutes);
app.use((_req, res) => res.status(404).json({ message: 'Endpoint không tồn tại' }));
app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => { console.error(error); res.status(500).json({ message: 'Đã xảy ra lỗi máy chủ' }); });
