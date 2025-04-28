# Documentación Técnica

# Resolvedor de Sopa de Letras
Versión 1.0 | Última actualización: [26-abril-2025]

## 1. Arquitectura del Sistema
![alt text](arquitectura.png)

* Frontend: React + Vite
* Core: Lógica de negocio independiente
* Servicios: Casos de uso y validaciones

## 2. Stack Tecnológico Detallado
``` bash
Dependencias Principales:
"dependencies": {
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-icons": "^5.5.0",
  "react-router-dom": "^7.5.2",
  "react-slick": "^0.30.3",
  "styled-components": "^6.1.17"
}
```
### Estructura del proyecto
```bash
sopa-de-letras/
├── public/                    # Archivos estáticos
│   ├── index.html             # Plantilla HTML principal
│   ├── favicon.ico            # Icono de la aplicación
│   └── assets/                # Imágenes/fuentes
│
├── src/                       # Código fuente
│   ├── core/                  # Lógica de negocio (Clean Architecture)
│   │   ├── domain/            # Entidades y modelos
│   │   │   └── WordSearch.js  # Algoritmo de búsqueda
│   │   └── services/          # Casos de uso
│   │       └── WordSearchService.js  
│   │
│   ├── infrastructure/        # Adaptadores externos
│   │   ├── api/               # Llamadas HTTP (si aplica)
│   │   └── storage/           # Persistencia local
│   │
│   ├── presentation/          # Interfaz de usuario
│   │   ├── components/        # Componentes reutilizables
│   │   ├── pages/             # Vistas principales
│   │   └── styles/            # Estilos globales
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
└── vite.config.js             # Configuración de Vite
```

## 3. Algoritmo de Búsqueda
``` bash
Complejidad: O(n*m*l) donde:
* n: Filas de la matriz
* m: Columnas de la matriz
* l: Longitud de la palabra
```
// Ejemplo del núcleo del algoritmo
```bash
function searchWord(matrix, word) {
  // Implementación 8 direcciones
}
```

## 4. Flujo de Datos
![alt text](flujo.png)

## 5. Guía de Contribución
* Clonar repositorio

* Instalar dependencias:
``` bash
npm install
```
* Ejecutar tests:
``` bash
npm test
```
## 6. Pruebas Unitarias
``` bash
// Ejemplo test con Jest
test('Encuentra palabra horizontal', () => {
  const matrix = [['A','B','C'], ['D','E','F']];
  expect(searchWord(matrix, 'ABC')).toBeTruthy();
});
```
