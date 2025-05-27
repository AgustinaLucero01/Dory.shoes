import { Sale } from "../models/Sale.js";
import { Cart } from "../models/Cart.js";
import { User } from "../models/User.js";
import { CartProduct } from "../models/CartProduct.js";

// POST -> crea una nueva venta y vacía el carrito del usuario
export const createSale = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId || !amount) {
      return res
        .status(400)
        .send({ message: "Se espera un id de carrito y un monto a pagar." });
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

    return res.status(200).json({
      message: "Venta realizada con éxito. Carrito vaciado.",
      sale: newSale,
    });

  } catch (error) {
    console.error("Error al crear una nueva venta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET -> todos los productos que están disponibles
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
