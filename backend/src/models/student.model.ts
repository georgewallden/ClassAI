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
import Parent from './parent.model';
import Class from './class.model';

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

  // Association mixins
  declare getParent: BelongsToGetAssociationMixin<Parent>;
  declare setParent: BelongsToSetAssociationMixin<Parent, number>;
  declare getClass: BelongsToGetAssociationMixin<Class>;
  declare setClass: BelongsToSetAssociationMixin<Class, number>;
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

// associations
Student.belongsTo(Parent, { foreignKey: 'parentId', as: 'parent' });
Student.belongsTo(Class,  { foreignKey: 'classId',  as: 'class' });
