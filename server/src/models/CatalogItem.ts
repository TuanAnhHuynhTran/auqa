import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class CatalogItem extends Model<InferAttributes<CatalogItem>, InferCreationAttributes<CatalogItem>> {
  declare id: CreationOptional<number>; declare slug: string; declare kind: 'fish' | 'plant' | 'rock'; declare name: string; declare description: string; declare color: string; declare price: number; declare active: CreationOptional<boolean>;
}
CatalogItem.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true }, slug: { type: DataTypes.STRING(80), unique: true, allowNull: false }, kind: { type: DataTypes.ENUM('fish', 'plant', 'rock'), allowNull: false }, name: { type: DataTypes.STRING(120), allowNull: false }, description: { type: DataTypes.STRING(500), allowNull: false }, color: { type: DataTypes.STRING(20), allowNull: false }, price: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }, active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { sequelize, tableName: 'catalog_items', modelName: 'CatalogItem', timestamps: true });
