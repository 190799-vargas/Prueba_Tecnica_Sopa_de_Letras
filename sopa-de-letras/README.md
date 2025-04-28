# Sopa de Letras - Solucionador Web

## Estructura del proyecto
sopa-de-letras/
├── public/
│   └── favicon.ico
|
├── src/
│   ├── assets/
│   |   ├── react.svg
│   |   ├── sopa1.png
│   |   ├── sopa2.png
│   |   ├── sopa3.png
│   |   ├── sopa4.png
│   |   ├── sopa5.png
│   |   ├── sopa6.png
│   |   ├── sopa7.png
│   |   ├── sopa8.png
│   |   └── sopa9.png
│   ├── components/
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   ├── Footer.module.css
│   │   │   └── index.js
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.module.css
│   │   │   └── index.js
│   │   └── WordSearch/
│   │       ├── WordSearchForm.jsx
│   │       ├── WordSearchForm.module.css
│   │       ├── WordSearchResults.jsx
│   │       ├── WordSearchResults.module.css
│   │       └── index.js
│   ├── pages/
│   │   ├── HomePage/
│   │   │   ├── HomePage.jsx
│   │   │   ├── HomePage.module.css
│   │   │   └── index.js
│   │   ├── ResultsPage/
│   │   │   ├── ResultsPage.jsx
│   │   │   ├── ResultsPage.module.css
│   │   │   └── index.js
│   │   └── AboutPage/
│   │       ├── AboutPage.jsx
│   │       ├── AboutPage.module.css
│   │       └── index.js
│   ├── core/
│   │   ├── domain/
│   │   │   └── WordSearch.js
│   │   └── services/
│   │       └── WordSearchService.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   ├── App.jsx
│   └── main.jsx
├── docs/
│   ├── GUIA_USUARIO.docx
│   └── TECH.md
├── .gitignore
├── package.json
├── README.md
└── vite.config.js

## Recursos Especiales Utilizados en el desarrollo

### Algoritmos Implementados
- **Búsqueda Multidimensional Optimizada**: Algoritmo de 8 direcciones con complejidad O(n*m*l)
- **Parser de Matrices Adaptativo**: Interpreta múltiples formatos de entrada
- **Sistema de Caching**: Memoización de resultados para mejor rendimiento

### Herramientas de Desarrollo
|-----------------------------------------------------|
| Herramienta         | Uso                           |
|-----------------------------------------------------|
| ESLint              | Control de calidad de código  |
|---------------------|-------------------------------|
| Prettier            | Formateo consistente          |
|---------------------|-------------------------------|
| Git Hooks           | Validaciones pre-commit       |
|---------------------|-------------------------------|
| Planeacion escrita  | Diseño Planeado y Estructurado|
|---------------------|-------------------------------|

### Recursos de Diseño
- **Paleta de Colores**: Basada en WCAG AA
- **Iconografía**: Material Design Icons
- **Animaciones**: Transiciones CSS para mejor UX

## Tecnologías Empleadas

### Frontend Principal
|-------------------------------------------------------------------|
| Tecnología       | Versión |  Uso                                 |
|------------------|---------|--------------------------------------|
| React            | 19.00   | Biblioteca principal para interfaces |
|------------------|---------|--------------------------------------|
| Vite             | 4.4.5   | Bundler y servidor                   |
|------------------|---------|--------------------------------------|
| React DOM        | 19.0.0  | Renderizado componentes              |
|------------------|---------|--------------------------------------|
| react-router-dom | 7.5.2   | Navegación entre vistas              |
|------------------|---------|--------------------------------------|
| HTML5            | 5       | Estructura de la aplicación          |
|------------------|---------|--------------------------------------|
| CSS3             | 3       | Estilos y diseño responsive          |
|------------------|---------|--------------------------------------|
| styled-components| 6.1.17  | Estilos CSS-in-JS                    |
|-------------------------------------------------------------------|

### Componentes Especializados
|-------------------------------------------------------------------|
| Tecnología     | Versión|  Uso                                    |
|----------------|--------|-----------------------------------------|
| React Slick    | 19.00  | Componente de carrusel                  |
|----------------|--------|-----------------------------------------|
| Slick Carousel | 4.4.5  | Librería base para carrusel             |
|----------------|--------|-----------------------------------------|
| react-icons    | 5.5.0  | Pquete para utlizar iconos              |
|----------------|--------|-----------------------------------------|

### Principios Arquitectónicos
- **Clean Architecture**: Separación clara de capas
- **SOLID**: Principios de diseño OOP
- **Patrón Container-Presenter**: Para componentes

## Guía de Despliegue

### Requisitos Previos
- Node.js v18+
- Entorno de Desarrollo (Preferencial)
- npm v9+
- Git (opcional)

### Instalación Local
```bash
git clone https://github.com/tu-usuario/sopa-de-letras.git
cd sopa-de-letras
npm install
```
### Comandos Disponibles
|-------------------------------------------------|
| Comando         | Descripción                   |
|-----------------|-------------------------------|
| npm run dev     | Inicia servidor de desarrollo |
|-----------------|-------------------------------|
| npm run build   | Crea versión para producción  |
|-----------------|-------------------------------|
| npm run preview | Sirve versión construida      |
|-------------------------------------------------|

### Url de Ejecucion dependiendo del comando
|-------------------------------------------------|
| Comando         | URL                           |
|-----------------|-------------------------------|
| npm run dev     | Local: http://localhost:5173/ |
|-----------------|-------------------------------|
| npm run preview | Local: http://localhost:4173/ |
|-------------------------------------------------|

### Despliegue en Plataformas
- **Vercel**:
    - Conectar repositorio GitHub
    - Configuración automática

- **Netlify**:
    - comando:
        Build command: npm run build
        Publish directory: dist

- **Docker**:
    - comando:
        docker build -t sopa-de-letras .
        docker run -p 4173:4173 sopa-de-letras




