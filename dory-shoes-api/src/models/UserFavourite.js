import { DataTypes, NOW } from "sequelize";
import { sequelize } from "../db.js";

export const UserFavourite = sequelize.define(
  "userFavourite",
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
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
    },
  },
  { timestamps: false }
);