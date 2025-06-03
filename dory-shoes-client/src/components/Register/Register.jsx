import React, { useRef, useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import "./Register.css";
import { validatePassword } from "./validations.js";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { useAuth } from "../Service/auth/usercontext/UserContext.jsx";

const Registro = ({ isEdit }) => {
  const { id, token } = useAuth();

  const { userId } = useParams();

  const [user, setUser] = useState();

  const location = useLocation();
  const from = location.state?.from || "/";

  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      fetchUser();
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "user");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setZipCode(user.zipCode || "");
      setPassword("Password1");
      setNewPassword("Password1");
      setActive(user.active || false);
    }
  }, [user]);

  //fetch para traer los datos del usuario
  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/getUser/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        navigate("/");
        throw new Error("Usuario no encontrado");
      }
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [active, setActive] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const zipCodeRef = useRef(null);
  const passwordRef = useRef(null);
  const newPasswordRef = useRef(null);

  const [errors, setErrors] = useState({
    email: false,
    name: false,
    phone: false,
    address: false,
    zipCode: false,
    password: false,
    newPassword: false,
  });

  const handleRouter = () => {
    navigate(from);
  };

  const handleOnChangeName = (event) => {
    setName(event.target.value);
    setErrors({ ...errors, name: false });
  };

  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: false });
  };

  const handleOnChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleOnChangePhone = (event) => {
    setPhone(event.target.value);
    setErrors({ ...errors, phone: false });
  };

  const handleOnChangeAddress = (event) => {
    setAddress(event.target.value);
    setErrors({ ...errors, address: false });
  };

  const handleOnChangeZipCode = (event) => {
    setZipCode(event.target.value);
    setErrors({ ...errors, zipCode: false });
  };

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: false });
  };

  const handleOnChangeNewPW = (event) => {
    setNewPassword(event.target.value);
    setErrors({ ...errors, newPassword: false });
  };

  const handleOnChangeActive = (event) => {
    setActive(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (!nameRef.current.value.length) {
      setErrors({ ...errors, name: true });
      nameRef.current.focus();
      hasError = true;
      return;
    }

    if (!emailRef.current.value.length) {
      setErrors({ ...errors, email: true });
      emailRef.current.focus();
      hasError = true;
      return;
    }

    if (!phone.length || phone.length < 10) {
      setErrors({ ...errors, phone: true });
      if (!hasError) phoneRef.current.focus();
      hasError = true;
      return;
    }

    if (!addressRef.current.value.length) {
      setErrors({ ...errors, address: true });
      if (!hasError) addressRef.current.focus();
      hasError = true;
      return;
    }

    if (!zipCodeRef.current.value.length) {
      setErrors({ ...errors, zipCode: true });
      if (!hasError) zipCode.current.focus();
      hasError = true;
      return;
    }
    if (!validatePassword(password, 5, null, true, true)) {
      setErrors({ ...errors, password: true });
      if (!hasError) passwordRef.current.focus();
      hasError = true;
      return;
    }

    if (newPassword != password) {
      setErrors({ ...errors, newPassword: true });
      if (!hasError) newPasswordRef.current.focus();
      hasError = true;
      return;
    }

    const formData = isEdit
      ? {
          id: user.id,
          name,
          email,
          role,
          phone,
          address,
          zipCode,
          active
        }
      : {
          name,
          email,
          password,
          phone,
          address,
          zipCode,
        };
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/updateUser` : "/register";
    const headers = isEdit
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" };

    try {
      console.log(formData);
      await fetch(`http://localhost:3000${url}`, {
        method,
        headers,
        body: JSON.stringify(formData),
      });

      if (isEdit) {
        navigate(from, { state: { showConfirmEdit: true } });
      }

      if (from == "/" && !isEdit) {
        navigate("/", { state: { showWelcomeToast: true } });
      }
      if (from == "/login") {
        navigate("/login", { state: { showConfirmRegister: true } });
      }
    } catch (err) {
      console.log(`Error al enviar el formulario:${err}`);
    }
  };

  const ROLES = [
    { label: "Administrador", value: "admin" },
    { label: "Usuario", value: "user" },
    { label: "Super Administrador", value: "superAdmin" },
  ];
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ marginTop: from == "/login" ? "30vh" : "0" }}
    >
      <div className="Registro-box">
        {isEdit ? <h2>Modificá los datos</h2> : <h2>Registro</h2>}
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ingrese su nombre"
            ref={nameRef}
            value={name}
            onChange={handleOnChangeName}
          />
          {errors.name && <p className="error-text">Complete el campo</p>}

          <input
            type="email"
            placeholder="Ingrese su email"
            value={email}
            ref={emailRef}
            onChange={handleOnChangeEmail}
          />
          {errors.email && <p className="error-text">Complete el campo</p>}

          {from == "/dashboard" && (
            <select name="role" value={role} onChange={handleOnChangeRole}>
              {ROLES.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          )}

          <input
            type="number"
            placeholder="Ingrese su número de teléfono"
            value={phone}
            ref={phoneRef}
            onChange={handleOnChangePhone}
          />
          {errors.phone && (
            <p className="error-text">Complete el campo con 12 caracteres</p>
          )}

          <input
            type="text"
            placeholder="Ingrese su dirección"
            value={address}
            ref={addressRef}
            onChange={handleOnChangeAddress}
          />
          {errors.address && <p className="error-text">Complete el campo</p>}

          <input
            type="text"
            placeholder="Ingrese su código postal"
            value={zipCode}
            ref={zipCodeRef}
            onChange={handleOnChangeZipCode}
          />
          {errors.zipCode && <p className="error-text">Complete el campo</p>}
          <input
            type="password"
            placeholder="Ingrese una contraseña"
            value={password}
            ref={passwordRef}
            onChange={handleOnChangePassword}
            disabled={isEdit}
          />
          {errors.password && (
            <p className="error-text">
              La contraseña debe tener más de 5 caracteres, una mayúscula y un
              número.
            </p>
          )}

          <input
            type="password"
            placeholder="Vuleva a ingresar la contraseña"
            value={newPassword}
            ref={newPasswordRef}
            onChange={handleOnChangeNewPW}
            disabled={isEdit}
          />
          {errors.newPassword && (
            <p className="error-text">Asegurate que la contraseña sea igual</p>
          )}
          {from == "/dashboard" && (
            <label style={{ display: "block", marginTop: "10px" }}>
              <input
                style={{ maxHeight: "20px", maxWidth: "50px" }}
                type="checkbox"
                checked={active}
                onChange={handleOnChangeActive}
              />{" "}
              Usuario activo
            </label>
          )}

          <Button type="submit">Enviar</Button>
          <Button onClick={handleRouter}>Regresar</Button>
        </form>
      </div>
    </Container>
  );
};
export default Registro;
