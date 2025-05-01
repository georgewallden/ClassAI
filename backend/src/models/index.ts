// ClassAI/backend/src/models/index.ts

import Parent    from './parent.model';
import Student   from './student.model';
import ClassModel from './class.model';
import UsageLog  from './usageLog.model';

import db        from '../config/db';

export const sequelize = db;
export {
  Parent,
  Student,
  ClassModel as Class,
  UsageLog
};