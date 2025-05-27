import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

//Clase hijo de Product que especifica el talle del producto
export const ProductSize = sequelize.define(
  "productSize",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    size: {
      type: DataTypes.ENUM(
        "35",
        "36",
        "37",
        "38",
        "39",
        "40"
      ),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);