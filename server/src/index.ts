import 'dotenv/config';
import { app } from './app.js';
import { connectDatabase } from './config/database.js';
import './models/AquariumDesign.js';
import './models/CatalogItem.js';
import './models/Aquarium.js';

const port = Number(process.env.PORT ?? 3001);
connectDatabase().then(() => app.listen(port, () => console.log(`✓ AquaVerse API running at http://localhost:${port}/api`))).catch((error) => { console.error('Database startup failed:', error); process.exit(1); });
