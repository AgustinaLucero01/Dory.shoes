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
  //Espera los datos del producto y un diccionario (talle: stock)
  const { name, description, price, imageUrl, category, sizes } = req.body;

  if (!name || !description || !price) {
    return res
      .status(400)
      .send({ message: "Nombre, descripción y precio son requeridos." });
  }

  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      imageUrl,
      category,
    });

    //Creo un arreglo para guardar todas las instancias de ProductSize que debo crear
    const sizesToCreate = [];

    for (const size in sizes) {
      const stock = sizes[size];
      if (stock > 0) {
        sizesToCreate.push({
          productId: newProduct.id,
          size,
          stock,
        });
      }
    }

    //Crea todos los ProductSize juntos (bulkCreate)
    const newProductSizes = await ProductSize.bulkCreate(sizesToCreate);

    return res.status(201).json({
      product: newProduct,
      sizes: newProductSizes,
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return res.status(500).send({ message: "Error interno del servidor" });
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

    for (const size in sizes) {
      const stock = sizes[size];

      // Buscamos si ya existe un ProductSize para este talle
      const existingSize = await ProductSize.findOne({
        where: {
          productId: product.id,
          size: size,
        },
      });

      if (stock > 0) {
        if (existingSize) {
          // Si existe, lo actualizamos
          await existingSize.update({ stock });
        } else {
          // Si no existe, lo creamos
          await ProductSize.create({
            productId: product.id,
            size,
            stock,
          });
        }
      } else {
        // Si el stock es 0 y existe, lo eliminamos
        if (existingSize) {
          await existingSize.destroy();
        }
      }
    }

    // Traemos el producto actualizado con talles (JOIN)
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
    return res.status(500).send({ message: "Error interno del servidor" });
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
