import { ProductSize } from "../models/ProductSize.js";
import { Product } from "../models/Product.js";

// GET -> todos los productos
export const getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  //falta verificar si hay productos en stock (verificar en ProductSize)
  res.json(products);
};

// GET -> devuelve un producto especifico
export const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).send({ message: "Producto no encontrado." });
  }

  res.json(product);
};

// POST -> crea un nuevo producto
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
