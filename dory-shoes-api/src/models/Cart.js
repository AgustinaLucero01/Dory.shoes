import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);
