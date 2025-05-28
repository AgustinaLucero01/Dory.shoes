import { ProductSize } from "../models/ProductSize.js";
import { Product } from "../models/Product.js";
import { Op } from "sequelize";

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
      group: ["Product.id"],
    });
    if (!products) {
      res.status(400).json({ message: "No hay productos para mostrar" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos con stock:", error);
    res.json({ message: error });
  }
};

// GET -> devuelve un producto especifico y los talles disponibles
export const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id, {
    include: [
      {
        model: ProductSize,
        attributes: ["size", "stock"],
        required: false,
      },
    ],
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
export const createProduct = async (req, res) => {
  const { name, description, price, imageUrl, category, sizes } = req.body;

  if (!name || !description || !price || !sizes) {
    return res
      .status(400)
      .send({ message: "Nombre, descripción, precio y talles son requeridos." });
  }

  const existing = await Product.findOne({ where: { name: name } });
  if (existing) {
  return res.status(400).json({ message: "Producto ya existe" });
  }

  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      imageUrl,
      category,
    });

    // Talles posibles del 35 al 40
    const allSizes = ["35", "36", "37", "38", "39", "40"];

    // Si no se ingresaron datos en un talle, se inicializa en 0
    const sizesToCreate = allSizes.map((size) => ({
      productId: newProduct.id,
      size,
      stock: sizes[size] ?? 0, // si no viene ese talle, stock 0
    }));

    const newProductSizes = await ProductSize.bulkCreate(sizesToCreate);

    return res.status(201).json({
      product: newProduct,
      sizes: newProductSizes,
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return res.status(500).send({ message: error.message });
  }
};

// PUT -> Modificar datos de un producto especifico
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl, category, sizes } = req.body;

  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).send({ message: "Producto no encontrado." });
  }

  try {
    await product.update({
      name,
      description,
      price,
      imageUrl,
      category,
    });

    const allSizes = ["35", "36", "37", "38", "39", "40"];

    for (const size of allSizes) {
      const stock = sizes[size] ?? 0;

      const existingSize = await ProductSize.findOne({
        where: {
          productId: product.id,
          size: size,
        },
      });

      if (existingSize) {
        await existingSize.update({ stock });
      } else {
        await ProductSize.create({
          productId: product.id,
          size,
          stock,
        });
      }
    }

    const updatedProduct = await Product.findByPk(id, {
      include: [
        {
          model: ProductSize,
          attributes: ["size", "stock"],
        },
      ],
    });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return res.status(500).send({ message: error.message });
  }
};

// DELETE -> Borra un producto de la bbdd
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).send({ message: "Producto no encontrado." });
  }

  await product.destroy();

  res.send("Producto eliminado de la tienda.");
};
