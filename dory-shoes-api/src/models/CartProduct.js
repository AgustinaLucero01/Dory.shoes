import { DataTypes, NOW } from "sequelize";
import { sequelize } from "../db.js";

// Tabla intermedia para poder guardar varios productos en un mismo carrito
export const CartProducts = sequelize.define(
  "cartProducts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);
