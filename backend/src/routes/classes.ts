import { Router } from 'express';
import { Class as ClassModel, Student } from '../models';

const router = Router();

// GET /classes
router.get('/', async (req, res, next) => {
  try {
    const classes = await ClassModel.findAll();
    res.json(classes);
  } catch (err) {
    next(err);
  }
});

// GET /classes/:id/students
router.get('/:id/students', async (req, res, next) => {
  try {
    const classId = Number(req.params.id);
    const students = await Student.findAll({
      where: { classId },
      include: ['parent', 'usageLogs'],
    });
    res.json(students);
  } catch (err) {
    next(err);
  }
});

export default router;