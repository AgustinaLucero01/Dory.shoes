import React, { useRef, useState } from "react";
import "./Login-user.css";
import img from "/src/assets/img/imgen-login.jpg"
import Logo from "/src/assets/img/LogoLogin.jpeg"
import { FaUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router";


const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error, setError]=useState({email:false, password:false,})
    const emailRef = useRef(null);
    const passwordRef=useRef(null);
    const navigate=useNavigate()

    const handleRouter=()=>{
        navigate("/registro")
    }

    const handleOnchange = (event) =>{
            setEmail(event.target.value);
            setError({...error,email:false})
    }
    const handlePasswordOnchange=(event)=>{
        setPassword(event.target.value);
        setError({...error,password:false})
    }


    const handleSubmbit=(event)=>{
        event.preventDefault();
        let hasError=false;

        if(!emailRef.current.value.length && !password.length){
            setError({email: true, password: true })
            hasError=true
            
        } else if (!emailRef.current.value.length){
            setError({ ...error,email:true})
            emailRef.current.focus()
            hasError=true;
            return;

        } else if (!password.length || password.length<4){
            setError({ ...error,password:true})
            if (!hasError) passwordRef.current.focus();
            hasError = true;
            return;
        }
        if (hasError) return;

        setError({email:false, password:false});
        alert(`El email ingresado es: ${email} y el password es ${password}`);
    }

return(
    <div className="Login-Box">

        <div className="img-login">
            <img src={img} alt="imgen-login.jpg" />
        </div>
       
            <div className="user-login">
                <img src={Logo} alt="" />
                <h1>Bienvenido!</h1>
                <h4>inicia secion para continuar</h4>
                <form className="from-user"  action="" onSubmit={handleSubmbit}>
                    <FaUser className="input-user"/>
                    <input 
                    className={error.email && "border border-danger"}
                     type="email"
                      placeholder="Coloque su email"
                      ref={emailRef}
                      value={email}
                     onChange={handleOnchange}
                      />
                    {error.email && <p className="error-text">Complete el campo</p>}


                    <CiLock className="lock-user"/>
                    <input
                    className={error.password && "border border-danger"}
                     type="password"  
                     placeholder="ingrese su contraseña"
                     ref={passwordRef}
                     value={password}
                     onChange={handlePasswordOnchange}
                     />
                      {error.password && <p className="error-text">complete el campo, tenga en cuenta que sea mayor a 4 caracteres</p>}
                    <div className="submit">
                        <div>
                            <p onClick={handleRouter}>No tiene cuenta? inicie secion</p>
                            <p>Olvido la contraseña? recuperar</p>
                        </div>
                        <button><FaArrowRight className="arrow-user"/></button>
                    </div>
                </form>  
                    <h4>Tambien podes ingresar con estas redes sociales</h4>
                    <div className="red-social"> 
                       <FaGoogle className="icon"/>
                        <FaFacebook className="icon"/>
                        <FaInstagram className="icon"/>
                    </div>
            </div>
    </div>
)

}
export default Login