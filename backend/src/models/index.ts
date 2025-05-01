// backend/src/models/index.ts
import Parent     from './parent.model';
import Student    from './student.model';
import ClassModel from './class.model';
import UsageLog   from './usageLog.model';
import db         from '../config/db';

// 1↔* Parent→Students
Parent.hasMany(Student,  { foreignKey: 'parentId', as: 'children' });
Student.belongsTo(Parent,{ foreignKey: 'parentId', as: 'parent' });

// 1↔* Class→Students
ClassModel.hasMany(Student,  { foreignKey: 'classId', as: 'students' });
Student.belongsTo(ClassModel,{ foreignKey: 'classId',  as: 'class' });

// 1↔* Student→UsageLogs
Student.hasMany(UsageLog, { foreignKey: 'studentId', as: 'usageLogs' });
UsageLog.belongsTo(Student, { foreignKey: 'studentId', as: 'owner' });

export const sequelize = db;
export { Parent, Student, ClassModel as Class, UsageLog };