import React, { useState } from "react";
import "./faq.css";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";
import { BsCashCoin } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";
import { TbShoe } from "react-icons/tb";

const Faq = () => {
    const [showBuy, setShowBuy] = useState(false);
    const [showEnvio, setShowEnvio] = useState(false);
    const [showSeña, setShowSeña] = useState(false);
    const [showdev, setShowdev] = useState(false);

    const handledev = () => {
        setShowdev(!showdev);
    };

    const handleSeña = () => {
        setShowSeña(!showSeña);
    };

    const handleClick = () => {
        setShowBuy(!showBuy);
    };

    const handleEnvio = () => {
        setShowEnvio(!showEnvio);
    };
    return (
        <div className="container">
            <div className="faq-container">
                <h1>Preguntas frecuentes</h1>
                <div className="faq"></div>

                <div className="means-of-payment">
                    <h2>Medio de pago</h2>
                    <div className="Method">
                        <p>Transferencia </p>
                        <MdOutlinePhoneAndroid className="icon" />
                    </div>
                    <div className="Method">
                        <p>Efectivo</p>
                        <BsCashCoin className="icon" />
                        <h3>10% de descuento</h3>
                    </div>
                    <div className="faq"></div>

                    <div className="information">
                        <div className="shipping">
                            <div className="info-shipping">
                                <div className="title-with-icon" onClick={handleClick}>
                                    <SlEnvolopeLetter className="icon-shipping" />
                                    <h2>¿Cómo comprar?</h2>
                                </div>
                                {showBuy && (
                                    <p>
                                        Si te gustó un producto de nuestra página, guardalo en el carrito. Al terminar la compra, se enviará un mail con los detalles de la compra y el contacto del vendedor para acordar el tipo de pago. </p>
                                )}
                            </div>
                        </div>


                        <div className="Shipping">
                            <div className="info-shipping">
                                <div className="title-with-icon" onClick={handleEnvio}>
                                    <LiaShippingFastSolid className="icon-shipping" />
                                    <h2>¿Cómo es el envío?</h2>
                                </div>
                                {showEnvio && (
                                    <p>
                                        Luego de habernos comunicado, debemos coordinar el envío y definir la forma que elegirás para realizarlo.
                                        Puede ser por Correo Argentino o en un punto de retiro.
                                    </p>
                                )}
                            </div>
                        </div>


                        <div className="Shipping">
                            <div className="info-shipping">
                                <div className="title-with-icon" onClick={handleSeña}>
                                    <BsCashCoin className="icon-shipping" />
                                    <h2>¿Cómo finalizar la compra?</h2>
                                </div>
                                {showSeña && (
                                    <p>
                                        Por último se seña el producto con una cantidad de dinero acordado y se paga el restante al mes siguiente. </p>
                                )}
                            </div>
                        </div>


                        <div className="Shipping">
                            <div className="info-shipping">
                                <div className="title-with-icon" onClick={handledev}>
                                    <TbShoe className="icon-shipping" />
                                    <h2>¿Cómo es la política de devolución?</h2>
                                </div>
                                {showdev && (
                                    <p>
                                        Se pueden realizar cambios en caso de fallas en color, talle o modelo.
                                        Siempre que el producto no esté usado.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;