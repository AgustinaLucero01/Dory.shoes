import React, { useRef, useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import "./Register.css";
import { useNavigate, useParams } from "react-router-dom";

const Registro = ({ role, isEdit }) => {
  const { id } = useParams();

  const [user, setUser] = useState();

  useEffect(() => {
      fetchUser();
    }, [id]);
  
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/getUser/${id}`);
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

  const [email, setEmail] = useState(user?.email || "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");

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

  const navigate = useNavigate();
  const handleRouter = () => {
    if(role === "admin") {
        navigate("/dashboard");
    } else {
        navigate("/login");
    }
  };

  const handleOnChangeName = (event) => {
    setName(event.target.value);
    setErrors({ ...errors, name: false });
  };

  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: false });
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

    if (!phone.length || phone.length <= 10) {
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
    if (!password.length || password.length < 4) {
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

    const formData = {
      name,
      email,
      phone,
      address,
      zipCode,
      password,
      role,
    };
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/updateUser/${id}` : "/register";
    //FUNCIONA, FALTA TOAST
    try {
      await fetch(`http://localhost:3000${url}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),});

        if(role === "admin" && !isEdit) {
            navigate("/dashboard");
        } else {
            navigate("/");
        }
    } catch (err) {
      console.log("Error al enviar el formulario.");
    }
  };


  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="Registro-box">
        {isEdit ? <h2>Modifica tus datos</h2> :<h2>Registro</h2>}
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
          />
          {errors.password && (
            <p className="error-text">
              Complete el campo con 4 o mas caracteres
            </p>
          )}

          <input
            type="password"
            placeholder="Vuleva a ingresar la contraseña"
            value={newPassword}
            ref={newPasswordRef}
            onChange={handleOnChangeNewPW}
          />
          {errors.newPassword && (
            <p className="error-text">Asegurate que la contraseña sea igual</p>
          )}

          <Button type="submit">Enviar</Button>
          <Button onClick={handleRouter}>Regresar</Button>
        </form>
      </div>
    </Container>
  );
};
export default Registro;
