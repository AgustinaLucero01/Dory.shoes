import { Sale } from "../models/Sale.js";
import { Cart } from "../models/Cart.js";
import { User } from "../models/User.js";
import { CartProduct } from "../models/CartProduct.js";
import { ProductSize } from "../models/ProductSize.js"

// POST -> crea una nueva venta, modifica el stock y vacía el carrito del usuario
export const createSale = async (req, res) => {
  try {
    const { userId, amount, products } = req.body;

    if (!userId || !amount || !products) {
      return res
        .status(400)
        .send({ message: "Se espera un id de carrito, los productos comprados y un monto a pagar." });
    }
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }

    if (amount <= 0) {
        return res.status(404).send({ message: "Monto no válido." });
    }

    const newSale = await Sale.create({
          userId,
          amount,
        });
    
    // Buscar el carrito del usuario
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).send({ message: "Carrito no encontrado." });
    }

    // Eliminar todos los productos del carrito
    await CartProduct.destroy({
      where: { cartId: cart.id },
    });

    // Para todos los productos comprados, modificamos el stock disponible
    for (const item of products) {
      const productSizeId = item.productSizeId;
      const quantity = item.quantity;

      const productSize = await ProductSize.findByPk(productSizeId);

      if (!productSize) {
        return res.status(400).json({ error: `Talle con ID ${productSizeId} no encontrado.` });
      }

      // Verificar stock suficiente
      if (productSize.stock < quantity) {
        return res.status(400).json({ error: `Stock insuficiente para el talle ${productSize.size}.` });
      }

      // Descontar stock
      productSize.stock -= quantity;

      await productSize.save();
    }

    return res.status(200).json({
      message: "Venta realizada con éxito, carrito vaciado y stock actualizado.",
      sale: newSale,
    });

  } catch (error) {
    console.error("Error al crear una nueva venta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET -> todas las ventas realizadas y el total ganado (suma de todas las ventas)
export const showAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    const totalAmount = await Sale.sum("amount");

    res.status(200).json({
      sales,
      totalAmount,
    });
  } catch (error) {
    console.error("Error al obtener las ventas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
