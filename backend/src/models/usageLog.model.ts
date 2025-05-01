// backend/models/src/usageLog.model.ts

import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  BelongsToGetAssociationMixin,
} from 'sequelize';
import db from '../config/db';
import Student from './student.model';

export default class UsageLog extends Model<
  InferAttributes<UsageLog>,
  InferCreationAttributes<UsageLog>
> {
  declare id: number;
  declare app: string;
  declare timestamp: Date;
  declare studentId: number;

  // Association mixin
  declare getStudent: BelongsToGetAssociationMixin<Student>;
}

UsageLog.init(
  {
    id:        { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    app:       { type: DataTypes.STRING,  allowNull: false },
    timestamp: { type: DataTypes.DATE,    allowNull: false },
    studentId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize: db,
    tableName: 'UsageLogs',
    timestamps: false,
  }
);

UsageLog.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });
