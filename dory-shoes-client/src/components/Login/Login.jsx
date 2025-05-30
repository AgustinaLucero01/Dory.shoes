import React, { useRef, useState } from "react";
import "./Login.css";
// import img from "public/images/Login-register/imgen-login.jpg"
// import Logo from "public/images/Login-register/LogoLogin.jpeg"
import { FaUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuth } from "../Service/usercontext/UserContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ email: false, password: false, })

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate()

    const { login } = useAuth();

    const handleRouter = () => {
        navigate("/register", { state: { from: "/login" } });
    }

    const handleNavigateHome = () => {
        navigate("/")
    }
    const handleOnchange = (event) => {
        setEmail(event.target.value);
        setError({ ...error, email: false })
    }
    const handlePasswordOnchange = (event) => {
        setPassword(event.target.value);
        setError({ ...error, password: false })
    }


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

        setError({ email: false, password: false });

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

            localStorage.setItem("token", data.token);
            login(data);
            navigate("/",  { state: { showWelcomeToast: true, userName: data.name } });
        } catch (err) {
            console.error(err.message);
            alert(err.message);
        }
    };

    return (
         <div className="Login-Box">
        
                <div className="img-login">
                    <img src="/images/Login-register/imgen-login.jpg"  alt="imgen-login.jpg" />
                </div>
               
                    <div className="user-login">
                        <img src="/images/Login-register/LogoLogin.jpeg" alt="Logo de login" onClick={handleNavigateHome}/>
                        <h1>¡Bienvenido!</h1>
                        <h4>Inicia sesión para continuar</h4>
                        <form className="from-user"  action="" onSubmit={handleSubmbit}>
                            <FaUser className="input-user"/>
                            <input 
                            className={error.email && "border border-danger"}
                             type="email"
                              placeholder="Ingresa tu email"
                              ref={emailRef}
                              value={email}
                             onChange={handleOnchange}
                              />
                            {error.email && <p className="error-text">Completa el campo</p>}
        
        
                            <CiLock className="lock-user"/>
                            <input
                            className={error.password && "border border-danger"}
                             type="password"  
                             placeholder="Ingresa tu contraseña"
                             ref={passwordRef}
                             value={password}
                             onChange={handlePasswordOnchange}
                             />
                              {error.password && <p className="error-text">Completa el campo</p>}
                            <div className="submit">
                                <div>
                                    <p onClick={handleRouter}>¿No tienes cuenta? Regístrate</p>
                                    <p>¿Olvidaste tu contraseña?</p>
                                </div>
                                <button><FaArrowRight className="arrow-user"/></button>
                            </div>
                        </form> 
                        <div className="information">
                            <h4>También puedes ingresar con estas redes sociales</h4>
                            <div className="red-social"> 
                               <FaGoogle className="icon"/>
                                <FaFacebook className="icon"/>
                                <FaInstagram className="icon"/>
                            </div>
                        </div>
                    </div>
            </div>
    )

}
export default Login