import { Router } from 'express';
import { Parent, Student } from '../models';

const router = Router();

// GET /parents
router.get('/', async (req, res, next) => {
  try {
    const parents = await Parent.findAll();
    res.json(parents);
  } catch (err) {
    next(err);
  }
});

// GET /parents/:id/students
router.get('/:id/students', async (req, res, next) => {
  try {
    const parentId = Number(req.params.id);
    const kids = await Student.findAll({
      where: { parentId },
      include: ['class', 'usageLogs'],
    });
    res.json(kids);
  } catch (err) {
    next(err);
  }
});

export default router;