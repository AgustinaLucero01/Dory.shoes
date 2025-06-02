//Archivo con todas las relaciones entre tablas
//Si lo dejaba en cada modelo, me tiraba error por las referencias cruzadas entre tablas
import { sequelize } from "../db.js";

import { Cart } from "./Cart.js";
import { CartProduct } from "./CartProduct.js";
import { Product } from "./Product.js";
import { ProductSize } from "./ProductSize.js";
import { Sale } from "./Sale.js";
import { User } from "./User.js";
import { UserFavourite } from "./UserFavourite.js";

// ---------------- RELACIONES ---------------- //

// Cart - CartProduct
Cart.hasMany(CartProduct, { foreignKey: "cartId" });
Cart.belongsTo(User, { foreignKey: "userId" });
CartProduct.belongsTo(Cart, { foreignKey: "cartId" });
CartProduct.belongsTo(ProductSize, { foreignKey: "productSizeId" });
ProductSize.hasMany(CartProduct, {
  foreignKey: "productSizeId",
  onDelete: "CASCADE",
  hooks: true,
});

// Product - ProductSize
Product.hasMany(ProductSize, {
  foreignKey: "productId",
  onDelete: "CASCADE",
  hooks: true,
});
ProductSize.belongsTo(Product, { foreignKey: "productId" });

// Product - UserFavourite
Product.hasMany(UserFavourite, {
  foreignKey: "productId",
  onDelete: "CASCADE",
  hooks: true,
});
UserFavourite.belongsTo(Product, { foreignKey: "productId" });

// User - UserFavourite
User.hasMany(UserFavourite, { foreignKey: "userId" });
UserFavourite.belongsTo(User, { foreignKey: "userId" });

// User - Sale
User.hasMany(Sale, { foreignKey: "userId"});
Sale.belongsTo(User, { foreignKey: "userId"});

// User - Cart
User.hasOne(Cart, { foreignKey: "userId"});
Cart.belongsTo(User, { foreignKey: "userId" });

// -------------------------------------------------- //

export {
  sequelize,
  Cart,
  CartProduct,
  Product,
  ProductSize,
  Sale,
  User,
  UserFavourite,
};