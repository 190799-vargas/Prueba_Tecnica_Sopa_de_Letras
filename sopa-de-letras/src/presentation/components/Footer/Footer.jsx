import { FaGithub, FaLinkedin, FaRegCopyright } from "react-icons/fa";
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footerContent}>
                <div className={styles.footerSection}>
                    <h3>Resolvedor de Sopa de Letras</h3>
                    <p>La solución profesional para resolver sopas de letras de manera eficiente.</p>
                    <p>Soporta matrices 14×14 y 16×16 con búsqueda en 8 direcciones.</p>
                </div>

                <div className={styles.footerSection}>
                    <h3>Enlace Rápido</h3>
                    <a href="/about">Acerca de</a>
                </div>

                <div className={styles.footerSection}>
                    <h3>Contacto</h3>
                    <p>victor19vargas2018@gmail.com</p>
                    <p>+57 (323) 381-2937</p>
                    <div className={styles.socialLinks}>
                        <a href="https://github.com/190799-vargas" aria-label="GitHub">
                        <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/𝚅𝚒𝚌𝚝𝚘𝚛-𝙰𝚕𝚏𝚘𝚗𝚜𝚘-𝚅𝚊𝚛𝚐𝚊𝚜-diaz-6b853a355" aria-label="LinkedIn">
                        <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>

            <div className={styles.copyright}>
                <FaRegCopyright />
                <span>{new Date().getFullYear()} Resolvedor de Sopa de Letras. Todos los derechos reservados.</span>
            </div>
        </footer>
    );

}