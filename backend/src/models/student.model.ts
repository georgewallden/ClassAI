// backend/src/models/student.model.ts

import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from 'sequelize';
import db from '../config/db';

export default class Student extends Model<
  InferAttributes<Student>,
  InferCreationAttributes<Student>
> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare grade: string | null;

  declare parentId: number | null;
  declare classId: number | null;
}

Student.init(
  {
    id:       { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name:     { type: DataTypes.STRING,  allowNull: false },
    email:    { type: DataTypes.STRING,  allowNull: false },
    grade:    DataTypes.STRING,
    parentId: { type: DataTypes.INTEGER, allowNull: true },
    classId:  { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    sequelize: db,
    tableName: 'Students',
    timestamps: false,
  }
);

