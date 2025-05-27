import { UserFavourite } from "../models/UserFavourite.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";

// POST -> Agrega a un producto entre los favoritos del usuario
export const addFavourite = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!productId || !userId) {
      return res
        .status(404)
        .send({ message: "Debe ingresar un id de producto y de usuario." });
    }

    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);

    if (!user || !product) {
      return res.status(404).send({
        message: "No se encontró un producto o un usuario con ese id.",
      });
    }

    const newUserFavourite = await UserFavourite.create({
      userId,
      productId,
    });
    res.json(newUserFavourite);
  } catch (error) {
    console.error("Error al agregar a favoritos:", error);
    res.status(500).json({ message: error.message });
  }
};

//DELETE -> Quita a un producto de los favoritos del usuario
export const deleteFavourite = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(404)
        .send({ message: "Debe ingresar un id de producto en favoritos." });
    }

    const favouriteProduct = await UserFavourite.findByPk(id);

    if (!favouriteProduct) {
      return res.status(404).send({
        message: "No se encontró ningún producto en favoritos con ese id.",
      });
    }

    await favouriteProduct.destroy();
    res.send("Producto eliminado de favoritos.");
  } catch (error) {
    console.error("Error al quitar producto de favoritos:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET -> Trae todos los productos favoritos de un usuario
export const showAllUserFavourites = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(404)
        .send({ message: "Debe ingresar un id de producto en favoritos." });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({
        message: "El usuario ingresado no existe.",
      });
    }

    const favouriteProducts = await UserFavourite.findAll({
      where: { userId: id },
    });

    res.json(favouriteProducts);
  } catch (error) {
    console.error("Error al mostrar favoritos:", error);
    res.status(500).json({ message: error.message });
  }
};
