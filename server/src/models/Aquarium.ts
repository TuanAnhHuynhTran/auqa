import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Aquarium extends Model<InferAttributes<Aquarium>, InferCreationAttributes<Aquarium>> {
  declare id: CreationOptional<string>; declare name: string; declare config: object; declare objects: object[]; declare createdAt: CreationOptional<Date>; declare updatedAt: CreationOptional<Date>;
}
Aquarium.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true }, name: { type: DataTypes.STRING(120), allowNull: false }, config: { type: DataTypes.JSON, allowNull: false }, objects: { type: DataTypes.JSON, allowNull: false, defaultValue: [] }, createdAt: DataTypes.DATE, updatedAt: DataTypes.DATE,
}, { sequelize, tableName: 'aquariums', modelName: 'Aquarium' });
