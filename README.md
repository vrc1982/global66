# Vue 3 + Vite

Este proyecto está creado con **Vue 3**, **Vite**, **Pinia** y **Tailwind CSS**. A continuación, encontrarás detalles sobre su instalación, configuración y características principales.

---

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/vrc1982/global66.git
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

---

## Tecnologías utilizadas

-   **Vite:** Herramienta de construcción rápida para proyectos Vue.
-   **Vue 3:** Framework progresivo para construir interfaces de usuario.
-   **Pinia:** Biblioteca para la gestión del estado global.
-   **Tailwind CSS:** Framework de utilidades CSS para diseño rápido y responsivo.

---

## Características principales

-   **Tailwind CSS:**
    -   Se utiliza para utilidades de diseño responsivo, animaciones y otras funcionalidades.

-   **Página Welcome:**
    -   La imagen del Pokémon utiliza la propiedad `aspect-ratio` para evitar "saltos" al cargar.

-   **Pantalla de búsqueda sin resultados:**
    -   En Figma, la pantalla para búsquedas sin resultados no tiene los botones inferiores. Sin embargo, se decidió dejarlos en la implementación, ya que la búsqueda puede arrojar resultados diferentes si se filtra por "Todos" o "Favoritos".

-   **Página List:**
    -   Se utiliza una técnica de carga progresiva para no sobrecargar la renderización, mostrando un bloque de filas a medida que se utiliza el scroll.

---

## Componentes principales

-   **Componente Button:**
    -   Se creó con estilos predefinidos para reutilizarlo en distintas páginas.
    -   Permite personalizar el color de fondo y otros estilos mediante clases externas.

-   **Componente Loader:**
    -   Muestra un indicador de carga mientras se realizan operaciones asíncronas.
    -   Utiliza un composable de Vue (`useLoader`) para gestionar su estado.

-   **Componente Modal:**
    -   Muestra información detallada de un Pokémon.
    -   Utiliza un composable de Vue (`useModal`) para abrir y cerrar el modal.

---

## Pruebas

Se implementaron tests para garantizar el correcto funcionamiento de los componentes principales:

### **Componente Button**

1. **Renderizado del contenido del slot:**
    - Verifica que el botón renderice correctamente el contenido pasado a través del slot.

2. **Evento de clic:**
    - Verifica que el botón emita un evento de clic cuando se hace clic en él.

### **Componente Loader**

1. **Estado de visibilidad:**
    - Verifica que el componente `Loader` se muestre cuando el estado `isVisible` del composable `useLoader` es `true`.

### **Componente Modal**

1. **Texto del botón:**
    - Verifica que el texto del botón **"Share to my friends"** esté presente en el modal.

2. **Cierre del modal:**
    - Verifica que el modal desaparezca del DOM cuando el estado del composable `useModal` indica que está cerrado.

---

## Ejecución de pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```bash
npx vitest
```
