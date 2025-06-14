const products = [
  {
    name: "Borcego negro caña baja",
    price: 15000,
    imageUrl: "/images/Botas/bota1.jpg",
    category: "botas",
    sizes: {
      35: 2,
      36: 5,
      37: 3,
      38: 4,
      39: 1,
      40: 0,
    },
  },
  {
    name: "Bota alta camel",
    description: "Botas",
    price: 180000,
    imageUrl: "/images/Botas/bota2.jpg",
    category: "botas",
    sizes: {
      35: 1,
      36: 2,
      37: 0,
      38: 3,
      39: 2,
      40: 5,
    },
  },
  {
    name: "Bota alta negra",
    price: 180000,
    imageUrl: "/images/Botas/bota3.jpg",
    category: "botas",
    sizes: {
      35: 1,
      36: 2,
      37: 1,
      38: 3,
      39: 2,
      40: 0,
    },
  },
  {
    name: "Borcego caña media",
    price: 190000,
    imageUrl: "/images/Botas/bota4.jpg",
    category: "botas",
    sizes: {
      35: 1,
      36: 2,
      37: 3,
      38: 4,
      39: 2,
      40: 1,
    },
  },
  {
    name: "Zapatilla Gazelle negra",
    price: 150000,
    imageUrl: "/images/Zapatillas/zapatilla1.jpg",
    category: "zapatillas",
    sizes: {
      35: 1,
      36: 2,
      37: 0,
      38: 3,
      39: 2,
      40: 5,
    },
  },
  {
    name: "Zapatilla Gazelle chocolate",
    price: 150000,
    imageUrl: "/images/Zapatillas/zapatilla2.jpg",
    category: "zapatillas",
    sizes: {
      35: 1,
      36: 1,
      37: 0,
      38: 1,
      39: 2,
      40: 0,
    },
  },
  {
    name: "New Balance off white",
    price: 200000,
    imageUrl: "/images/Zapatillas/zapatilla3.jpg",
    category: "zapatillas",
    sizes: {
      35: 1,
      36: 4,
      37: 2,
      38: 3,
      39: 2,
      40: 1,
    },
  },
  {
    name: "New Balance black",
    price: 200000,
    imageUrl: "/images/Zapatillas/zapatilla4.jpg",
    category: "zapatillas",
    sizes: {
      35: 1,
      36: 5,
      37: 2,
      38: 6,
      39: 4,
      40: 2,
    },
  },
  {
    name: "Pantufla bold black",
    price: 120000,
    imageUrl: "/images/Pantuflas/pantu1.jpg",
    category: "pantuflas",
    sizes: {
      35: 1,
      36: 2,
      37: 5,
      38: 8,
      39: 5,
      40: 5,
    },
  },
  {
    name: "Pantufla beige",
    description: "Pantuflas",
    price: 150000,
    imageUrl: "/images/Pantuflas/pantu2.jpg",
    category: "pantuflas",
    sizes: {
      35: 3,
      36: 2,
      37: 5,
      38: 6,
      39: 0,
      40: 0,
    },
  },
  {
    name: "Pantufla bold camel",
    price: 150000,
    imageUrl: "/images/Pantuflas/pantu3.jpg",
    category: "pantuflas",
    sizes: {
      35: 1,
      36: 2,
      37: 4,
      38: 3,
      39: 0,
      40: 0,
    },
  },
  {
    name: "Pantufla gris",
    price: 120000,
    imageUrl: "/images/Pantuflas/pantu4.jpg",
    category: "pantuflas",
    sizes: {
      35: 1,
      36: 2,
      37: 5,
      38: 3,
      39: 2,
      40: 5,
    },
  },
  {
    name: "Zapato flat leopard",
    price: 150000,
    imageUrl: "/images/Zapatos/zapato1.jpg",
    category: "zapatos",
    sizes: {
      35: 1,
      36: 2,
      37: 1,
      38: 3,
      39: 2,
      40: 0,
    },
  },
  {
    name: "Zapato flat negro",
    price: 160000,
    imageUrl: "/images/Zapatos/zapato2.jpg",
    category: "zapatos",
    sizes: {
      35: 1,
      36: 2,
      37: 0,
      38: 3,
      39: 2,
      40: 5,
    },
  },
  {
    name: "Zapato cerrado",
    price: 160000,
    imageUrl: "/images/Zapatos/zapato3.jpg",
    category: "zapatos",
    sizes: {
      35: 1,
      36: 6,
      37: 4,
      38: 4,
      39: 2,
      40: 1,
    },
  },
  {
    name: "Zapato guillermina",
    price: 16000,
    category: "zapatos",
    imageUrl: "/images/Zapatos/zapato4.jpg",
    sizes: {
      35: 1,
      36: 0,
      37: 1,
      38: 3,
      39: 2,
      40: 0,
    },
  },
];

const superAdmin = {
  name: "Super Administrador",
  email: "superAdmin@gmail.com",
  password: "SuperAdmin123",
  role: "superAdmin",
  phone: "123456787",
  address: "Pellegrini 504",
  zipCode: "2000",
  dateOfBirth: "1999-05-27",
};
const API_URL_PRODUCT = "http://localhost:3000/createProduct";
const API_URL_USER = "http://localhost:3000/register";

async function populateDB() {
  await fetch(API_URL_USER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(superAdmin),
  });
  for (const product of products) {
    try {
      const res = await fetch(API_URL_PRODUCT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(`Error al crear ${product.name}:`, data.message || data);
      } else {
        console.log(`Producto creado: ${data.product.name}`);
      }
    } catch (err) {
      console.error(`Fallo al procesar ${product.name}:`, err);
    }
  }
}

populateDB();
