import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class AquariumDesign extends Model<InferAttributes<AquariumDesign>, InferCreationAttributes<AquariumDesign>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: CreationOptional<string>;
  declare tankSize: 'compact' | 'classic' | 'panorama';
  declare objects: object[];
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

AquariumDesign.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(120), allowNull: false },
  description: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
  tankSize: { type: DataTypes.ENUM('compact', 'classic', 'panorama'), allowNull: false, defaultValue: 'classic' },
  objects: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
  createdAt: DataTypes.DATE, updatedAt: DataTypes.DATE,
}, { sequelize, tableName: 'aquarium_designs', modelName: 'AquariumDesign' });
