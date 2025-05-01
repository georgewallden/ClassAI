// backend/src/app.ts
import express, { RequestHandler } from 'express';
import cors    from 'cors';
import studentRouter from './routes/students';
import parentRouter  from './routes/parents';
import classRouter   from './routes/classes';
import usageRouter   from './routes/usageLogs';
import { sequelize } from './models';

const app = express();
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.json());

// mount routers
app.use('/students',  studentRouter);
app.use('/parents',   parentRouter);
app.use('/classes',   classRouter);
app.use('/usageLogs', usageRouter);

// health‐check handler as a RequestHandler
const healthCheck: RequestHandler = (req, res) => {
  res.json({ status: 'ok' });
};

app.get('/health', healthCheck);

// start server after DB connection is established
sequelize.authenticate()
  .then(() => {
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    app.listen(port, () => {
      console.log(`API listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });
