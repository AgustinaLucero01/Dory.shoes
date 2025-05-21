import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Cart } from "../models/Cart.js";
import {
  validateString,
  validateEmail,
  validatePassword,
} from "../helpers/validations.js";

// Middleware para verificar el token JWT en las solicitudes
export const verifyToken = (req, res, next) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];

  // Validación del token
  if (!token) {
    return res.status(401).json({ message: "No posee autorización" });
  }

  try {
    //Clave secreta = guardar en .env
    const payload = jwt.verify(token, `programacion3-2025`);

    //next: continuar con la siguiente consulta
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "No posee los permisos para acceder." });
  }
};

// POST -> Registra un nuevo usuario en la BBDD
export const registerUser = async (req, res) => {
  const result = validateRegisterUser(req.body);

  if (result.error) {
    return res.status(400).send({ message: result.message });
  }

  const { name, email, password, phone, address, zipCode, dateOfBirth } =
    req.body;

  // Busca si ya existe un usuario con ese email
  const user = await User.findOne({
    where: { email },
  });

  if (user)
    return res.status(400).send({ message: "Este email ya está registrado." });

  // Configura 10 rondas de salt
  const saltRounds = 10;

  // Genera un salt único
  const salt = await bcrypt.genSalt(saltRounds);

  // Hashea la contraseña con el salt
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    zipCode,
    dateOfBirth,
  });

  //Creamos la instancia del carrito que el usuario va a usar para comprar
  const newCart = await Cart.create({
    userId: newUser.id,
  });

  //Devolvemos los id de las instancias creadas
  res.json({ userId: newUser.id, cartId: newCart.id });
};

// Función para validar los datos ingresados por el usuario en el Login
const validateRegisterUser = (req) => {
  const result = {
    error: false,
    message: "",
  };

  const { name, email, password } = req;

  if (!name || !validateString(name, 3, null)) {
    return {
      error: true,
      message: "Nombre inválido.",
    };
  }

  if (!email || !validateEmail(email)) {
    return {
      error: true,
      message: "Mail inválido.",
    };
  }

  if (!password || !validatePassword(password, 7, null, true, true)) {
    return {
      error: true,
      message: "Contraseña inválida.",
    };
  }

  return result;
};

// POST -> Autentica al usuario que quiere iniciar sesión
export const loginUser = async (req, res) => {
  try {
    const result = validateLoginUser(req.body);

    if (result.error) {
      return res.status(400).send({ message: result.message });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) return res.status(401).send({ message: "Usuario no existente" });

    const comparison = await bcrypt.compare(password, user.password);

    if (!comparison)
      return res
        .status(401)
        .send({ message: "Email y/o contraseña incorrecta" });

    // Guardar en .env
    const secretKey = "programacion3-2025";

    const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

    return res.json(token);
  } catch (error) {
    console.error("Error en loginUser:", error);
    return res.status(500).send({ message: "Error interno del servidor" });
  }
};

// Función para validar los datos ingresados por el usuario en el registro
const validateLoginUser = (req) => {
  const result = {
    error: false,
    message: "",
  };

  const { email, password } = req;

  if (!email || !validateEmail(email)) {
    return {
      error: false,
      message: "Mail inválido.",
    };
  }

  if (!password || !validatePassword(password, 7, null, true, true)) {
    return {
      error: true,
      message: "Contraseña inválida.",
    };
  }

  return result;
};

// PUT -> Modifica los datos del usuario
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phone, address, zipCode, dateOfBirth } =
    req.body;

  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Este usuario no está registrado." });
    }

    const fieldsToUpdate = {
      name,
      email,
      phone,
      address,
      zipCode,
      dateOfBirth,
    };

    // Solo si se envió una nueva contraseña, la hasheamos
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      fieldsToUpdate.password = hashedPassword;
    }

    // Actualizamos el usuario
    await user.update(fieldsToUpdate);

    res.json({ message: "Usuario actualizado correctamente", userId: user.id });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.send({ message: error.message });
  }
};
