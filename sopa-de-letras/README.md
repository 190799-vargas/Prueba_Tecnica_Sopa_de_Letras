# Sopa de Letras - Solucionador Web

## 1. Descripción del Proyecto
Aplicación web para resolver sopas de letras:

- ✔️ Búsqueda en 8 direcciones (horizontal, vertical, diagonal)
- ✔️ Soporte para matrices 14×14 y 16×16
- ✔️ Interfaz intuitiva desarrollada con **React** y **Vite**

## 2.  Estructura del proyecto
```bash
sopa-de-letras/
├── public/                    # Archivos estáticos
│   └── favicon.ico            # Icono de la aplicación
│
├── src/                       # Código fuente
│   ├── assets                 # Imagenes y fuentes
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
│   ├── core/                  # Lógica de negocio (Clean Architecture)
│   │   ├── domain/            # Entidades y modelos
│   │   │   └── WordSearch.js  # Algoritmo de búsqueda
│   │   └── services/          # Casos de uso
│   │       └── WordSearchService.js  
│   │
│   │
│   ├── presentation/          # Interfaz de usuario
│   │   ├── components/        # Componentes reutilizables
│   │   |    ├── Footer/             # Pie de  pagina
|   |   |    |    ├── Footer.jsx
│   │   |    |    └── Footer.module.css
│   │   |    ├── Navbar/             # Barra de navegacion
|   |   |    |    ├── Navbar.css
│   │   |    |    └── Navbar.jsx
│   │   |    ├── WordSearchForm/     # Formulario principal
|   |   |    |    ├── WordSearchForm.css
│   │   |    |    └── WordSearchForm.jsx
│   │   |    └── WordSearchResults/  # Vista resultados
|   |   |    |    ├── WordSearchResults.css
│   │   |    |    └── WordSearchResults.jsx
│   │   ├── pages/             # Vistas principales
│   │   |    ├── AboutPage/    # Acerca de
|   |   |    |    ├── AboutPage.css
│   │   |    |    └── AboutPage.jsx
│   │   |    ├── EditSeachPage/     # Pagina de edicion
|   |   |    |    ├── EditSeachPage.css
│   │   |    |    └── EditSeachPage.jsx
│   │   |    ├── HomePage/     # Pagina principal
|   |   |    |    ├── HomePage.css
│   │   |    |    └── HomePage.jsx
│   │   |    ├── ResultsPage/  # Pagina de resultados
|   |   |    |    ├── ResultsPage.css
│   │   |    |    └── ResultsPage.jsx
│   │   └── styles/            # Estilos globales
│   │   |    └──global.css     # Archivo de estilos
│   │
│   ├── App.jsx                # Componente raíz
│   └── main.jsx               # Punto de entrada
│
├── docs/                      # Documentación
│   ├── GUIA_USUARIO.docx      # Manual de usuario
│   └── TECH.md                # Especificaciones técnicas
│
├── .gitignore                 # Archivos excluidos de Git
├── package.json               # Dependencias y scripts
├── README.md                  # Documentacion 
└── vite.config.js             # Configuración de Vite
```
## Descripción clave
| Ruta                                    | Responsabilidad                            |
|-----------------------------------------|--------------------------------------------|
| core/domain/WordSearch.js               | Algoritmo de búsqueda en matriz            |
| presentation/components/WordSearchForm.jsx | Formulario de entrada de datos           |
| presentation/pages/ResultsPage.jsx      | Visualización interactiva de resultados    |

| vite.config.js            


## 3.  Recursos Especiales Utilizados en el desarrollo

### Algoritmos Implementados
- **Búsqueda Multidimensional Optimizada**: Algoritmo de 8 direcciones con complejidad O(n*m*l)
``` bash
// WordSearch.js
const directions = [
  [1,0], [-1,0], [0,1], [0,-1], // Horizontal/Vertical
  [1,1], [1,-1], [-1,1], [-1,-1] // Diagonal
];
```
- **Parser de Matrices Adaptativo**: Interpreta múltiples formatos de entrada
- **Sistema de Caching**: Memoización de resultados para mejor rendimiento

### Herramientas de Desarrollo
| Herramienta         | Uso                          |
|---------------------|-------------------------------|
| ESLint              | Control de calidad de código  |
| Prettier            | Formateo consistente          |
| Git Hooks           | Validaciones pre-commit       |
| Planeación escrita  | Diseño planeado y estructurado |

### Recursos de Diseño
- **Paleta de Colores**: Basada en WCAG AA
- **Iconografía**: Material Design Icons
- **Animaciones**: Transiciones CSS para mejor UX

## 4. Tecnologías Empleadas

### Frontend Principal
| Tecnología        | Versión | Uso                                 |
|-------------------|---------|-------------------------------------|
| React             | 19.0.0  | Biblioteca principal para interfaces |
| Vite              | 4.4.5   | Bundler y servidor                  |
| React DOM         | 19.0.0  | Renderizado de componentes          |
| react-router-dom  | 7.5.2   | Navegación entre vistas             |
| HTML5             | 5       | Estructura de la aplicación         |
| CSS3              | 3       | Estilos y diseño responsive         |
| styled-components | 6.1.17  | Estilos CSS-in-JS                   |

### Componentes Especializados
| Tecnología       | Versión | Uso                                 |
|------------------|---------|-------------------------------------|
| React Slick      | 0.29.0  | Componente de carrusel              |
| Slick Carousel   | 1.8.1   | Librería base para carrusel         |
| react-icons      | 5.5.0   | Paquete para utilizar iconos        |

### Principios Arquitectónicos
- **Clean Architecture**: Separación clara de capas
- **SOLID**: Principios de diseño OOP
- **Patrón Container-Presenter**: Para componentes

## 5.  Guía de Despliegue

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
| Comando         | Descripción                   |
|-----------------|-------------------------------|
| npm run dev     | Inicia servidor de desarrollo |
| npm run build   | Crea versión para producción  |
| npm run preview | Sirve versión construida      |


### Url de Ejecucion dependiendo del comando
``` bash
| Comando         | URL                           |
|-----------------|-------------------------------|
| npm run dev     | Local: http://localhost:5173/ |
| npm run preview | Local: http://localhost:4173/ |
```

### Despliegue en Plataformas
- **Vercel**:
    - Conectar repositorio GitHub
    - Configuración automática

- **Netlify**:
  ``` bash
    - comando:
        Build command: npm run build
        Publish directory: dist
  ```

- **Docker**:
``` bash
    - comando:
        docker build -t sopa-de-letras .
        docker run -p 4173:4173 sopa-de-letras
```
## 6. Diagrama de flujo
![diagrama](https://github.com/user-attachments/assets/6088f540-185f-4a8e-a3c2-3d830bfdace7)

## 7.  Licencia
Este proyecto está licenciado bajo la MIT License - Libre uso y modificación.



