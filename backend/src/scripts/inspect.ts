// backend/src/scripts/inspect.ts
import { sequelize, Student, Parent, Class as ClassModel, UsageLog } from '../models';

async function main() {
  await sequelize.authenticate();

  console.log('🌱 Students with Parents & Classes:');
  const students = await Student.findAll({
    include: [
      { model: Parent, as: 'parent', attributes: ['name', 'email'] },
      { model: ClassModel, as: 'class',  attributes: ['name', 'teacher'] },
    ],
    limit: 5,
  });
  console.dir(students.map(s => s.toJSON()), { depth: null });

  console.log('\n📈 Recent Usage Logs:');
  const logs = await UsageLog.findAll({
    include: [{ model: Student, as: 'student', attributes: ['name'] }],
    order: [['timestamp', 'DESC']],
    limit: 10,
  });
  console.dir(logs.map(l => l.toJSON()), { depth: null });

  await sequelize.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});