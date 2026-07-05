# Phishing Analyzer UI 🌐✨

[![Astro](https://img.shields.io/badge/Astro-v4-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-Island-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind__CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)

Interfaz de usuario web interactiva y premium con temática cinematográfica de ciberseguridad. Funciona como cliente para consumir la **Phishing Analyzer API**, procesando las solicitudes a través de una arquitectura moderna desacoplada. El diseño combina el rendimiento estático con micro-interacciones inmersivas en 3D.

---

## 🛸 Arquitectura Web & UX/UI Premium

- **Arquitectura de Islas (Astro + React):** Utiliza la arquitectura orientada a componentes de Astro para servir HTML estático ultra-ligero de forma nativa, cargando e hidratando de forma aislada (`client:load`) únicamente los componentes interactivos de React (formulario de escaneo, dashboard de analítica).
- **Interfaz Hacker Estilo Glassmorphism:** Estética visual oscura inspirada en interfaces SaaS de élite (Vercel, Linear). Utiliza desenfoques de fondo avanzados (`backdrop-filter: blur`), bordes con sutiles gradientes de neón e indicadores cromáticos dinámicos según el nivel de amenaza (rojo para amenazas críticas, amarillo para alertas medias, verde para correos seguros).
- **Core Visual 3D (React Three Fiber):** Renderizado interactivo y ligero en tiempo real de una estructura de red geométrica en 3D de temática ciberseguridad. Responde de forma sutil al movimiento del cursor del usuario mediante cálculos matemáticos de paralaje, sin penalizar el rendimiento del hilo principal del navegador.
- **Animaciones de Transición Fluidas:** Orquestación de estados de interfaz (Formulario ➡️ Pantalla de Carga/Terminal Fake ➡️ Cuadro de Resultados) utilizando `Framer Motion`, con soporte para desmontajes animados (`AnimatePresence`).

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|---|---|
| Meta-framework | Astro (Static-First Architecture) |
| Librería de Componentes | React |
| Diseño & Estilos | Tailwind CSS v4 (arquitectura CSS-First optimizada vía Vite) |
| Animaciones | Framer Motion |
| Gráficos 3D | Three.js, `@react-three/fiber`, `@react-three/drei` (low-poly optimization) |
| Gestor de Paquetes | `pnpm` |

---

## 🎨 Especificaciones de Diseño Realizadas

- **Fondo de pantalla:** Negro profundo cyber (`#0a0a0f`).
- **Tarjetas de cristal:** Fondo semitransparente (`rgba(18, 18, 26, 0.6)`) con desenfoque de 20px y borde atenuado.
- **Tipografía:** Tipos de letra limpios sans-serif (Inter) para la interfaz operativa y fuentes monoespaciadas de estilo consola de comandos (JetBrains Mono / Fira Code) para simular el proceso de descifrado técnico por IA.

---

## 🔌 Integración con la API y Control de Errores

El cliente interactúa directamente con el backend mediante peticiones asíncronas aisladas, evitando configuraciones proxy complejas que enmascaren la validación real de políticas **CORS**. El sistema lee de forma nativa las respuestas HTTP:

1. **Status 200 (OK):** Activa el renderizado del indicador de porcentaje (`ThreatGauge`), animando el anillo SVG de forma fluida.
2. **Status 429 (Too Many Requests):** Intercepta la excepción de Rate Limiting e inyecta un componente de notificación flotante de alerta neón (`ErrorToast`), bloqueando temporalmente el formulario para proteger el servidor y educar al usuario sobre la política de tasa de uso.

---

## ⚙️ Instalación y Configuración Local

### Requisitos Previos

- Tener instalado `pnpm` en el sistema de desarrollo.
- Asegurarse de tener el servicio backend corriendo en el puerto `8081`.

### Pasos para Arrancar

1. Navegar al directorio del frontend:

```bash
cd frontend
```

2. Instalar el árbol de dependencias completo:

```bash
pnpm install
```

3. Iniciar el servidor de desarrollo local:

```bash
pnpm dev
```

La aplicación web se desplegará por defecto en `http://localhost:4321`, el cual ya se encuentra autorizado en la lista blanca de CORS del servidor de seguridad del backend.
