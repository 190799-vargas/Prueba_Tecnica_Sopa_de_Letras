import React from "react";
import image1 from "../../../assets/sopa1.png";
import image2 from "../../../assets/sopa2.png";
import image3 from "../../../assets/sopa3.png";
import image4 from "../../../assets/sopa4.png";
import image5 from "../../../assets/sopa5.png";
import image6 from "../../../assets/sopa6.png";
import image7 from "../../../assets/sopa7.png";
import image8 from "../../../assets/sopa8.png";
import image9 from "../../../assets/sopa9.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./AboutPage.css";

export const AboutPage = () => {
    // Configuración del slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
    };
    return (
        <div  className="about-container">

            <h3>Imágenes de la Aplicación</h3>
            <Slider {...settings} className="carousel-slider">
                <div><img src={image1} alt="imagen 1" className="carousel-img"/></div>
                <div><img src={image2} alt="imagen 2" className="carousel-img"/></div>
                <div><img src={image3} alt="imagen 3" className="carousel-img"/></div>
                <div><img src={image4} alt="imagen 4" className="carousel-img"/></div>
                <div><img src={image5} alt="imagen 5" className="carousel-img"/></div>
                <div><img src={image6} alt="imagen 6" className="carousel-img"/></div>
                <div><img src={image7} alt="imagen 7" className="carousel-img"/></div>
                <div><img src={image8} alt="imagen 8" className="carousel-img"/></div>
                <div><img src={image9} alt="imagen 9" className="carousel-img"/></div>
            </Slider>
            <br />
            <h2 className="about-title">Sobre la aplicación</h2>
            <h2>Descripción de la Aplicación</h2>
            <p className="about-text">
                Esta aplicación fue desarrollada como parte de un proyecto de prueba y a la vez de crecimiento.
                Su objetivo es resolver sopas de letras de manera automática, permitiendo a los usuarios
                ingresar una lista de palabras y una matriz de caracteres, y luego buscar las palabras en la matriz.
                La aplicación utiliza un algoritmo de búsqueda para encontrar las palabras en diferentes direcciones (horizontal, vertical y diagonal).
                Además, la aplicación es completamente responsiva, lo que significa que se adapta a diferentes tamaños de pantalla y dispositivos.
                La interfaz de usuario es intuitiva y fácil de usar, lo que permite a los usuarios interactuar con la aplicación sin complicaciones.
            </p>
            <p className="about-text">
                La aplicación sigue los principios de Arquitectura Limpia y SOLID, lo que 
                garantiza un código mantenible, escalable y de alta calidad.
            </p>
            <h3 className="about-subtitle">Tecnologías Utilizadas</h3>
            <ul className="about-list">
                <li><strong>🖥️ JavaScript:</strong> Para la lógica de la aplicación y la manipulación del DOM.</li>
                <li><strong>🌐 HTML5:</strong> Para la estructura básica de la aplicación.</li>
                <li><strong>⚛ React:</strong> Para la creación de la interfaz de usuario.</li>
                <li><strong>📦 React Router:</strong> Para la navegación entre páginas.</li>
                <li><strong>🎨 CSS:</strong> Para el diseño y estilo de la aplicación.</li>
                <li><strong>🔧 Webpack:</strong> Para la construcción y empaquetado de la aplicación.</li>
                <li><strong>📦 React Slick:</strong> Para el carrusel de imágenes.</li>
                <li><strong>🔍 Algoritmo de búsqueda:</strong> Implementado en JavaScript para resolver la sopa de letras.</li>
                <li><strong>🛠️ Arquitectura Limpia:</strong> Para una mejor organización del código y separación de responsabilidades.</li>
                <li><strong>🧩 Principios SOLID:</strong> Para un diseño orientado a objetos más robusto y flexible.</li>
                <li><strong>📱 Responsive Design:</strong> Para una experiencia de usuario óptima en dispositivos móviles y de escritorio.</li>
            </ul>
                
        </div>
    );
};
