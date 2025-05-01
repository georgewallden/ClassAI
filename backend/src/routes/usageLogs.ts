import { Router, RequestHandler } from 'express';
import { UsageLog } from '../models';

const router = Router();

// GET /usageLogs
const listUsageLogs: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const logs = await UsageLog.findAll({
      include: ['student'],
      order: [['timestamp', 'DESC']],
    });
    res.json(logs);
    // no return of res.json
  } catch (err) {
    next(err);
  }
};

// GET /usageLogs/:id
const getUsageLogById: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const log = await UsageLog.findByPk(id, {
      include: ['student'],
    });
    if (!log) {
      res.status(404).json({ error: 'Log not found' });
      return;
    }
    res.json(log);
  } catch (err) {
    next(err);
  }
};

router.get('/',       listUsageLogs);
router.get('/:id',    getUsageLogById);

export default router;