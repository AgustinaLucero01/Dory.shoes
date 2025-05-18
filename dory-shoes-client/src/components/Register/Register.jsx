import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import "./Register.css"
import { useNavigate } from "react-router";

const Registro =()=>{
    const [Email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [Lastname, setLastname]=useState("");
    const [Phone, setPhone]=useState("");
    const [password,setPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")

    const NameRef=useRef(null);
    const EmailRef=useRef(null);
    const LastnameRef=useRef(null);
    const PhoneRef=useRef(null);
    const passwordRef=useRef(null);
    const NewpasswordRef=useRef(null);

    const [errors,setErrors]=useState({
        Email:false, 
        name:false, 
        Lastname:false, 
        Phone:false,
        password:false,
        newPassword:false
    })

    const navigate= useNavigate()
    const handleRoter=()=>{
        navigate("/login");
    }

    const handleOnChange=(event)=>{
        setName(event.target.value);
        setErrors({...errors,name:false})
    }

    const handleOnchangeLastName=(event)=>{
        setLastname(event.target.value)
        setErrors({...errors,Lastname:false})
    }

    const handleOnChangeEmail=(event)=>{
        setEmail(event.target.value)
        setErrors({...errors,Email:false})
    }

    const handleOnChangePhone=(event)=>{
        setPhone(event.target.value)
        setErrors({...errors,Phone:false})
    }

    const handleOnChangePassword=(event)=>{
        setPassword(event.target.value)
        setErrors({...errors,password:false})
    }

    const handleOnChangeNewPW=(event)=>{
        setNewPassword(event.target.value)
        setErrors({...errors,newPassword:false})
    }


    const handleSubmint=(event)=>{
        event.preventDefault();
        let hasError=false;
        
        if (!NameRef.current.value.length) {
            setErrors({ ...errors, name: true }); 
            NameRef.current.focus();
            hasError = true;
            return;

        } 
        
        if (!LastnameRef.current.value.length){
            setErrors({...errors,Lastname:true});
            LastnameRef.current.focus();
            hasError=true;
            return;
        } 
        
        if(!EmailRef.current.value.length){
           setErrors({...errors,Email:true});
           EmailRef.current.focus()
            hasError=true;
            return;
        } 

        if(!Phone.length || Phone.length<=10){
            setErrors({...errors,Phone:true});
            if(!hasError)PhoneRef.current.focus()
            hasError=true
            return;
        }
        if(!password.length || password.length<4){
           setErrors({...errors,password:true})
           if(!hasError)passwordRef.current.focus()
            hasError=true
           return;
        }

        if(newPassword != password){
           setErrors({...errors, newPassword:true});
           if(!hasError)NewpasswordRef.current.focus();
            hasError=true;
            return;
        }

        if (hasError) return
        alert("enviado con exito")
    }

    return(
            <div className="Registro-box">
                <h2>Registro</h2>
                <form action="" onSubmit={handleSubmint}>
                    <input 
                    type="text"
                     placeholder="Ingrese su nombre" 
                     ref={NameRef}
                     value={name}
                     onChange={handleOnChange}
                     />
                     {errors.name && <p className="error-text">complete el campo</p>}

                    <input type="text" 
                    placeholder="Ingrese su apellido" 
                    value={Lastname} 
                    ref={LastnameRef}
                    onChange={handleOnchangeLastName}
                    />
                    {errors.Lastname && <p className="error-text">complete el campo</p>}

                    <input type="email" 
                    placeholder="Ingrese su email" 
                    value={Email}
                     ref={EmailRef} 
                     onChange={handleOnChangeEmail}
                     />
                    {errors.Email && <p className="error-text">complete el campo</p>}
                   
                    <input type="number" 
                    placeholder="Ingrese su numero de telefono" 
                    value={Phone} 
                    ref={PhoneRef}
                    onChange={handleOnChangePhone}
                    />
                    {errors.Phone && <p className="error-text">complete el campo con 12 caracteres</p>}

                    <input type="password" 
                    placeholder="Ingrese una contraseña"
                    value={password}
                    ref={passwordRef}
                    onChange={handleOnChangePassword}
                    />
                    {errors.password && <p className="error-text">complete el campo con 4 o mas caracteres</p>}
                   
                    <input type="password"
                     placeholder="Vuleva a ingresar la contraseña" 
                     value={newPassword} 
                     ref={NewpasswordRef}
                     onChange={handleOnChangeNewPW}
                      />
                     {errors.newPassword && <p className="error-text">asegurate que la contraseña sea igual</p>}
                   
                    <Button type="submint">enviar</Button>
                    <Button onClick={handleRoter}>Regresar</Button>
                </form>
            </div>
    )
}
export default Registro;