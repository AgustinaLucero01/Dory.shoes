import { Cart } from "../models/Cart.js";
import { CartProduct } from "../models/CartProduct.js";
import { Product } from "../models/Product.js";
import { ProductSize } from "../models/ProductSize.js";
import { Op } from "sequelize";

//GET -> Mostrar los productos relacionados con un carrito
export const showAllProductsFromCart = async (req, res) => {
  //Trae el carrito correspondiente al usuario que está ingresado (aparece en el token)
  const cart = await getCartByUser(req.user.id);

  if (!cart) {
    return res
      .status(404)
      .json({ message: "No se encontró un carrito para este usuario." });
  }

  //Trae todos los productos de dicho carrito
  const cartProducts = await CartProduct.findAll({
    where: { cartId: cart.id },
  });

  if (!cartProducts.length) {
    return res
      .status(404)
      .json({ message: "No hay productos en este carrito." });
  }

  res.json(cartProducts);
};

// POST -> Agrega un producto nuevo al carrito
export const addProductToCart = async (req, res) => {
  const { productId } = req.params;
  const { quantity, size } = req.body;

  const cart = await getCartByUser(req.user.id);

  if (!cart) {
    return res
      .status(404)
      .json({ message: "No se encontró un carrito para este usuario." });
  }

  // Verifica que el body haya traído los datos necesarios
  if (!productId || !quantity || !size) {
    return res.status(400).send({
      message: "No se encontraron los datos necesarios.",
    });
  }

  // Verificar que exista el producto
  const product = await Product.findByPk(productId);

  // Buscar el ProductSize correspondiente
  const productSize = await ProductSize.findOne({
    where: {
      productId: productId,
      size: size,
      stock: { [Op.gte]: 1 },
    },
  });

  if (!product || !productSize) {
    return res.status(400).send({
      message: "El producto seleccionado no existe.",
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
      cartId: cart.id,
      productSizeId: productSize.id,
    },
  });

  //Si ya existe, modificamos la cantidad en lugar de agregar una nueva instancia
  if (existingCartProduct) {
    existingCartProduct.quantity += quantity;
    await existingCartProduct.save();

    //Al devolver el nuevo producto del carrito, mandamos dentro todos los datos relevantes del producto
    //Con un Join de tablas (CartProduct, ProductSize y Product)
    const result = await CartProduct.findByPk(existingCartProduct.id, {
      include: [
        {
          model: ProductSize,
          include: [Product],
        },
      ],
    });

    return res.status(200).send(result);
  }

  // Si no existe, creamos uno nuevo
  const newCartProduct = await CartProduct.create({
    cartId: cart.id,
    productSizeId: productSize.id,
    quantity,
  });

  const result = await CartProduct.findByPk(newCartProduct.id, {
    include: [
      {
        model: ProductSize,
        include: [Product],
      },
    ],
  });

  return res.status(201).json(result);
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

//GET -> Muestra el carrito que se está usando en base al usuario que inició sesión
// Incluye todos los productos que están en el carrito, la llamamos desde el contexto
export const getCartDetails = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: [
        {
          model: CartProduct,
          include: [
            {
              model: ProductSize,
              include: [Product],
            },
          ],
        },
      ],
    });

    if (!cart) {
      return res.status(404).json({
        message: "No se encontró un carrito para este usuario.",
      });
    }

    // Calcular total de productos sumando quantity de cada CartProduct
    const totalProducts = cart.cartProducts.reduce(
      (total, cp) => total + cp.quantity,
      0
    );

    // Responder con el carrito + el total
    res.json({
      ...cart.toJSON(),
      totalProducts,
    });
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).json({ error });
  }
};

//Función para encontrar el carrito de acuerdo al usuario.
//Se reutiliza en varios servicios
const getCartByUser = async (userId) => {
  const cart = await Cart.findOne({ where: { userId } });
  return cart;
};

//DELETE -> Borra todos los productos del carrito
export const dropAllProductsFromCart = async (req, res) => {
  
  const cart = await getCartByUser(req.user.id);

  try {
    await CartProduct.destroy({
      where: { cartId: cart.id },
    });

    return res.status(200).json({ message: "Carrito vaciado." });
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
    return res.status(500).json({ message: "Error al vaciar el carrito." });
  }
};
