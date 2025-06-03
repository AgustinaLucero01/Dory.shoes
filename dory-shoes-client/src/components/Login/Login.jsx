import React, { useRef, useState, useEffect } from "react";
import "./Login.css";
import { FaUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth.js";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: false,
    password: false
  });
  const [authenticationError, setAuthenticationError] = useState({active: false, message: ""})

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.showConfirmRegister) {
      toast(`👢 Usuario registrado con éxito. Inicie sesión para continuar`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const handleRouter = () => {
    navigate("/register", { state: { from: "/login" } });
  };

  const handleNavigateHome = () => {
    navigate("/");
  };
  const handleOnchange = (event) => {
    setEmail(event.target.value);
    setError({ ...error, email: false });
    setAuthenticationError({active: false})
  };
  const handlePasswordOnchange = (event) => {
    setPassword(event.target.value);
    setError({ ...error, password: false });
    setAuthenticationError({active: false})
  };

  const handleSubmbit = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (!emailRef.current.value.length && !password.length) {
      setError({ email: true, password: true });
      hasError = true;
    } else if (!emailRef.current.value.length) {
      setError({ ...error, email: true });
      emailRef.current.focus();
      hasError = true;
      return;
    } else if (!password.length || password.length < 4) {
      setError({ ...error, password: true });
      if (!hasError) passwordRef.current.focus();
      hasError = true;
      return;
    }
    if (hasError) return;

    setError({ email: false, password: false});
    setAuthenticationError({active:false})

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      localStorage.setItem("dory-shoes-token", data.token);
      handleLogin(data.token);
      navigate("/", { state: { showWelcomeToast: true, userName: data.name } });
    } catch (err) {
      console.error(err.message);
      setAuthenticationError({active: true, message: err.message});
    }
  };

  return (
    <div className="Login-Box">
      <div className="user-login">
        <img
          src="/images/logo/logoLogin.jpg"
          alt="Logo de login"
          onClick={handleNavigateHome}
        />
        <h1>¡Bienvenido!</h1>
        <h4>Inicia sesión para continuar</h4>
        <form className="form-user" onSubmit={handleSubmbit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              className={error.email ? "border border-danger" : ""}
              type="email"
              placeholder="Ingresa tu email"
              ref={emailRef}
              value={email}
              onChange={handleOnchange}
            />
          </div>
          {error.email && <p className="error-text">Completa el campo</p>}

          <div className="input-group">
            <CiLock className="input-icon" />
            <input
              className={error.password ? "border border-danger" : ""}
              type="password"
              placeholder="Ingresa tu contraseña"
              ref={passwordRef}
              value={password}
              onChange={handlePasswordOnchange}
            />
          </div>
          {error.password && <p className="error-text">Completa el campo</p>}
          {authenticationError.active && (
            <p className="error-text">{authenticationError.message}</p>
          )}

          <div className="submit">
            <div>
              <p onClick={handleRouter}>¿No tienes cuenta? Regístrate</p>
            </div>
            <button>
              <FaArrowRight className="arrow-user" />
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Login;
