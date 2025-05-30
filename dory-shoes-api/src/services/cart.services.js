import { Cart } from "../models/Cart.js";
import { CartProduct } from "../models/CartProduct.js";
import { Product } from "../models/Product.js";
import {ProductSize} from "../models/ProductSize.js"

//GET -> Mostrar los productos relacionados con un carrito
export const showAllProductsFromCart = async (req, res) => {
  const { cartId } = req.body;

  //Verificar que exista el carrito
  const cart = await Cart.findByPk(cartId);

  if (!cart ) {
    return res
      .status(404)
      .send({ message: "El carrito seleccionado no existe." });
  }

  const cartProducts = await CartProduct.findAll({
    where: {cartId}
  });

  //¿Es necesario?
  if (!cartProducts.length) {
    return res
      .status(404)
      .send({ message: "No hay productos en este carrito." });
  }

  res.json(cartProducts);
};

// POST -> Agrega un producto nuevo al carrito
export const addProductToCart = async (req, res) => {
  const { productId } = req.params;
  const { cartId, quantity, size } = req.body;

  // Verifica que el body haya traído los datos necesarios
  if (!cartId || !productId || !quantity || !size) {
    return res.status(400).send({
      message: "No se encontraron los datos necesarios.",
    });
  }

  // Verificar que exista el carrito
  const cart = await Cart.findByPk(cartId);

  // Verificar que exista el producto
  const product = await Product.findByPk(productId);

  // Buscar el ProductSize correspondiente
  const productSize = await ProductSize.findOne({
    where: {
      productId: productId,
      size: size,
    },
  });

  if (!cart || !product || !productSize) {
    return res.status(400).send({
      message: "El carrito o producto seleccionado no existe.",
    });
  }

  // Verificar que la cantidad sea válida
  if (quantity < 1) {
    return res.status(400).send({
      message: "La cantidad debe ser mayor o igual a 1.",
    });
  }

  // Buscar si ya existe el producto con ese talle en el carrito
  const existingCartProduct = await CartProduct.findOne({
    where: {
      cartId,
      productSizeId: productSize.id,
    },
  });

  //Si ya existe, modificamos la cantidad en lugar de agregar una nueva instancia
  if (existingCartProduct) {
    existingCartProduct.quantity += quantity;
    await existingCartProduct.save();
    return res.status(200).send(existingCartProduct);
  }

  // Si no existe, creamos uno nuevo
  const newCartProduct = await CartProduct.create({
    cartId,
    productSizeId: productSize.id,
    quantity,
  });

  return res.status(201).send(newCartProduct);
};


// DELETE -> Borra la instancia de CartProduct asociada con el carrito correspondiente
export const dropProductFromCart = async (req, res) => {
  const { cartProductId } = req.body;

  //Verifica que el body haya traído el ID
  if (!cartProductId) {
    return res.status(400).send({ message: "No se encontró el ID necesario." });
  }

  //Verificar que exista la instancia de cartProduct correspondiente
  const cartProduct = await CartProduct.findByPk(cartProductId);

  if (!cartProduct) {
    return res.status(404).send({ message: "Producto no encontrado." });
  }

  await cartProduct.destroy();

  return res.send("Producto eliminado del carrito.");
};

// PUT -> Modifica el atributo "quantity" de la tabla CartProduct
// Si quantity = 0, generar un DELETE de CartProduct
export const modifyQuantity = async (req, res) => {
  const { cartProductId, quantity } = req.body;

  //Verifica que el body haya traído los datos necesarios
  if (!cartProductId) {
    return res
      .status(400)
      .send({ message: "No se encontró el id del producto a eliminar." });
  }

  //Verificar que exista la instancia de cartProduct correspondiente
  const cartProduct = await CartProduct.findByPk(cartProductId);

  if (!cartProduct) {
    return res.status(404).send({ message: "Producto no encontrado." });
  }

  if (quantity === 0) {
    await cartProduct.destroy();
    return res.send("Producto eliminado del carrito.");
  }

  await cartProduct.update({
    quantity,
  });

  res.send(cartProduct);
};
