import { ProductSize } from "../models/ProductSize.js";
import { Product } from "../models/Product.js";
import { Op } from 'sequelize';

// GET -> todos los productos que están disponibles
export const getAvailableProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      //JOIN de SQL con Sequelize
      include: {
        model: ProductSize,
        where: {
          //Op: operadores de Sequelize. Gte: greater than or equal
          stock: { [Op.gte]: 1 },
        },
        attributes: [], // no queremos traer los talles ni sus datos
      },
      group: ['Product.id'],
    });

    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos con stock:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET -> devuelve un producto especifico y los talles disponibles
export const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id, {
    include: [
      {
        model: ProductSize,
        where: {
          stock: { [Op.gt]: 0 }, //solo trae las instancias de ProductSize que tengan stock
        },
        attributes: ['size', 'stock'],
        required: false,
      }
    ]
  });

  if (!product) {
    return res.status(404).send({ message: "Producto no encontrado." });
  }

  // El json va tener todos los datos del producto con el Id ingresado y además un atributo
  // extra con un array de talles disponibles llamado "ProductSizes" (nombre por defecto). Ejemplo:
  // {
  //     "size": 38,
  //     "stock": 5
  //   },
  //   {
  //     "size": 40,
  //     "stock": 2
  //   },
  res.json(product);
};

// POST -> crea un nuevo producto
// Falta agregar la creación por talle
export const createProduct = async (req, res) => {
  const { name, description, price, imageUrl, category } = req.body;

  if (!name || !description || !price) {
    return res
      .status(400)
      .send({ message: "Nombre, descripción y precio son requeridos." });
  }

  const newProduct = await Product.create({
    name,
    description,
    price,
    imageUrl,
    category,
  });

  res.send(newProduct);
};

// PUT -> Modificar datos de un producto especifico
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl, category } = req.body;

  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).send({ message: "Producto no encontrado." });
  }

  await product.update({
    name,
    description,
    price,
    imageUrl,
    category,
  });

  res.send(product);
};

// DELETE -> Borra un producto de la bbdd (modificar por atributo "activo")
// Hay un atributo "activo" en Product y User para desactivarlos de la tienda
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).send({ message: "Producto no encontrado." });
  }

  await product.destroy();

  res.send("Producto eliminado de la tienda.");
};
