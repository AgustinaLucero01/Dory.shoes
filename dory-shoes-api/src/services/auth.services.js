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
    //Clave secreta
    const payload = jwt.verify(token, `programacion3-2025`);

    // Guardo el usuario en la request (sirve para el contexto del carrito)
    req.user = payload;

    //next: continuar con la siguiente consulta
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "No posee los permisos para acceder." });
  }
};

//Middleware para verificar rol del usuario ingresado
// Permite pasar uno o más roles válidos para acceder a una ruta
export const authorizeRole = (...rolesPermitidos) => {
  return (req, res, next) => {
    const rol = req.user.role;

    if (!rolesPermitidos.includes(rol)) {
      return res
        .status(403)
        .json({ message: "Acceso prohibido. Rol no autorizado." });
    }

    next();
  };
};

//Middleware para rutas mixtas: se usan con usuarios registrados y con invitados
//Se usa para ProductDetail, ya que trae datos diferentes si el usuario está logueado o no
export const optionalAuth = (req, res, next) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];

  if (!token) {
    // Si no hay token, simplemente continúa sin agregar req.user
    return next();
  }

  try {
    const payload = jwt.verify(token, "programacion3-2025");
    req.user = payload;
  } catch (error) {
    // Si el token es inválido, también continúa como usuario anónimo
    console.log("Token inválido, accediendo como usuario no autenticado");
  }

  next();
};

// POST -> Registra un nuevo usuario en la BBDD
export const registerUser = async (req, res) => {
  try {
    // Valida los datos ingresados por el usuario
    const result = validateRegisterUser(req.body);

    if (result.error) {
      return res.status(400).send({ message: result.message });
    }

    const { name, email, password, role, phone, address, zipCode } = req.body;

    // Busca si ya existe un usuario con ese email
    const user = await User.findOne({
      where: { email },
    });

    if (user) {
      return res
        .status(400)
        .send({ message: "Este email ya está registrado." });
    }

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
      role,
      address,
      zipCode,
      active: 1,
    });

    //Creamos la instancia del carrito que el usuario va a usar para comprar
    const newCart = await Cart.create({
      userId: newUser.id,
    });

    //Devolvemos los id de las instancias creadas
    res.json({ userId: newUser.id, cartId: newCart.id });
  } catch (err) {
    res.json({ message: `Error al crear usuario: ${err.message}` });
  }
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

  if (!password || !validatePassword(password, 5, null, true, true)) {
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
    //Valida los datos ingresados por el usuario
    const result = validateLoginUser(req.body);

    if (result.error) {
      return res.status(400).send({ message: result.message });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) return res.status(401).send({ message: "Usuario no existente" });

    if (!user.active) {
      return res
        .status(401)
        .send({ message: "El usuario ingresado está inactivo" });
    }

    const comparison = await bcrypt.compare(password, user.password);

    if (!comparison)
      return res
        .status(401)
        .send({ message: "Email y/o contraseña incorrecta" });

    //Esto debería incluirse en un .env
    const secretKey = "programacion3-2025";

    //Mandamos datos en el JWT para usarlos en otros servicios
    const token = jwt.sign({ id: user.id, email, role: user.role }, secretKey, {
      expiresIn: "1h",
    });

    return res.json({ token, name: user.name });
  } catch (error) {
    console.error("Error en loginUser:", error);
    return res.status(500).send({ message: error });
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

  if (!password) {
    return {
      error: false,
      message: "Contraseña inválida.",
    };
  }

  return result;
};

// PUT -> Modifica los datos del usuario
export const updateUser = async (req, res) => {
  const { id, name, email, password, phone, address, zipCode, role, active } =
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
      role,
      active,
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

//GET -> Devuelve todos los datos de un usuario específico
export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).send({ message: "Usuario no encontrado." });
  }
  res.json(user);
};

//PUT -> Modifica el atributo "active" del usuario, no lo elimina permanentemente
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ where: { id, active: 1 } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    await user.update({ active: false });

    return res
      .status(200)
      .json({ message: "Usuario desactivado correctamente." });
  } catch (error) {
    console.error("Error al desactivar el usuario:", error);
    return res.status(500).json({ message: error });
  }
};

//GET -> Trae a todos los usuarios registrados, primero los activos y después los inactivos
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["active", "DESC"]],
    });

    if (!users || users.length === 0) {
      return res.status(400).json({ message: "No hay usuarios para mostrar" });
    }

    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const dropUsers = async (req, res) => {
  const users = await User.destroy({
    where: { role: "user" },
  });

  return res.status(200).json({ message: "Usuarios eliminados." });
};
