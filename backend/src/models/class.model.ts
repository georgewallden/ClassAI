// backend/src/models/class.model.ts

import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import db from '../config/db';
import Student from './student.model';

export default class Class extends Model<
  InferAttributes<Class>,
  InferCreationAttributes<Class>
> {
  declare id: number;
  declare name: string;
  declare teacher: string;

  // Association mixin
  declare getStudents: HasManyGetAssociationsMixin<Student>;
}

Class.init(
  {
    id:      { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name:    { type: DataTypes.STRING,  allowNull: false },
    teacher: { type: DataTypes.STRING,  allowNull: false },
  },
  {
    sequelize: db,
    tableName: 'Classes',
    timestamps: false,
  }
);

Class.hasMany(Student, { foreignKey: 'classId', as: 'students' });
