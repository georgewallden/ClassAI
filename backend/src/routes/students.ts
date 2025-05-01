// backend/src/routes/students.ts
import { Router, RequestHandler } from 'express';
import { Student } from '../models';

const router = Router();

// GET /students?grade=...
const listStudents: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const where = req.query.grade ? { grade: String(req.query.grade) } : {};
    const students = await Student.findAll({
      where,
      include: ['parent', 'class', 'usageLogs'],
    });
    res.json(students);
    // no return of res.json
  } catch (err) {
    next(err);
  }
};

// GET /students/:id
const getStudentById: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const s = await Student.findByPk(id, {
      include: ['parent', 'class', 'usageLogs'],
    });
    if (!s) {
      res.status(404).json({ error: 'Student not found' });
      return;  // early exit, no return value
    }
    res.json(s);
  } catch (err) {
    next(err);
  }
};

router.get('/', listStudents);
router.get('/:id', getStudentById);

export default router;