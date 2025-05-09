import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Categories } from '../enums/enums.js';

//Clase padre que tiene toda la descripción del producto (clase hijo = ProductSize)
export const Product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM(Object.values(Categories)), 
      allowNull: false,
    },
  }, { timestamps: false }
);