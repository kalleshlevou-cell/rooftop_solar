import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import leadsRouter from './routes/leads.js';
import quotesRouter from './routes/quotes.js';
import projectsRouter from './routes/projects.js';
import adminRouter from './routes/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/leads', leadsRouter);
app.use('/api/quotes', quotesRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/admin', adminRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Company A Solar ERP & Lead Qualification Suite',
    location: 'Nagpur, Vidarbha',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend if client/dist exists
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.use((req, res, next) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      const indexPath = path.join(clientDist, 'index.html');
      if (fs.existsSync(indexPath)) {
        return res.sendFile(indexPath);
      }
    }
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Solar ERP Server running at http://localhost:${PORT}`);
});
