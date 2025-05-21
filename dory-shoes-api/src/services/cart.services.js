import { Cart } from "../models/Cart.js";
import { CartProduct } from "../models/CartProduct.js";
import { Product } from "../models/Product.js";

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
  const { cartId, quantity } = req.body;

  //Verifica que el body haya traído los ID
  if (!cartId || !productId || !quantity) {
    return res
      .status(400)
      .send({ message: "No se encontraron los datos necesarios." });
  }

  //Verificar que exista el carrito
  const cart = await Cart.findByPk(cartId);

  //Verificar que exista el producto
  const product = await Product.findByPk(productId);

  if (!cart || !product) {
    return res
      .status(400)
      .send({ message: "El carrito o producto seleccionado no existe." });
  }

  //Verificar que la cantidad sea mayor o igual a 1
  if (quantity < 1) {
    return res
      .status(400)
      .send({ message: "La cantidad debe ser mayor o igual a 1." });
  }

  const newCartProduct = await CartProduct.create({
    cartId,
    productId,
    quantity,
  });

  return res.send(newCartProduct);
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
