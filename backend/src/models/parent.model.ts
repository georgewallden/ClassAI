// ClassAI/backend/src/models/parent.model.ts

import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from '../config/db';

export default class Parent extends Model<
  InferAttributes<Parent>,
  InferCreationAttributes<Parent>
> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare phone: string | null;
}

Parent.init(
  {
    id:    { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name:  { type: DataTypes.STRING,  allowNull: false },
    email: { type: DataTypes.STRING,  allowNull: false },
    phone: DataTypes.STRING,
  },
  { sequelize: db, tableName: 'Parents', timestamps: false }
);
