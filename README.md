# Pandemonium
 
Tienda online para una marca de ropa alternativa, desarrollada con Laravel e Inertia.js. Incluye lookbook editorial, catálogo con filtros dinámicos, pasarela de pago con Stripe y un panel de administración completo.

<img width="1857" height="972" alt="imagen" src="https://github.com/user-attachments/assets/fc5f085b-ea53-4936-9e1a-c7018e6595cb" />
<img width="1680" height="882" alt="imagen" src="https://github.com/user-attachments/assets/9b6abe92-6be9-4f43-80c4-aa58254eadd7" />
<img width="1655" height="878" alt="imagen" src="https://github.com/user-attachments/assets/9d16e40f-ac41-4afb-acda-e1fe02588140" />
<img width="1734" height="920" alt="imagen" src="https://github.com/user-attachments/assets/a8c41d6e-84c3-47a6-8eed-4da10dcc3e9a" />
<img width="1762" height="950" alt="imagen" src="https://github.com/user-attachments/assets/1f7cf611-cd1b-4092-9a30-d896aed9b3d5" />
<img width="1490" height="803" alt="imagen" src="https://github.com/user-attachments/assets/c9df9acd-6272-47bb-a426-72bdf3f055f7" />
<img width="1841" height="976" alt="imagen" src="https://github.com/user-attachments/assets/503f56fd-c157-4deb-84c4-bed7a8e0e385" />
<img width="1468" height="962" alt="imagen" src="https://github.com/user-attachments/assets/23d69a07-2c5f-4fff-9292-179890625a4b" />
---
 
## Descripción
 
Pandemonium es una aplicación de comercio electrónico desarrollada como Trabajo de Fin de Grado del ciclo de Desarrollo de Aplicaciones Web. El proyecto da respuesta a la necesidad de una marca de ropa alternativa de disponer de un espacio de venta propio, con una identidad visual definida, frente a plataformas generalistas como Vinted o Wallapop.
 
A diferencia de una tienda convencional, la página de inicio no muestra directamente el catálogo, sino un lookbook con las imágenes de la colección activa. Desde ahí el usuario accede al catálogo, a la ficha de cada prenda y al proceso de compra.
 
## Características
 
- Lookbook en la página de inicio con carrusel de la colección activa
- Catálogo con filtros por talla, color, corte, categoría, colección y precio
- Ficha de producto con carrusel de imágenes
- Carrito de sesión y pago con Stripe integrado en la página, sin redirecciones externas
- Historial de compras por usuario
- Panel de administración para gestionar prendas, lookbooks, pedidos y usuarios
- Opciones de catálogo (tallas, colores, colecciones) editables desde el panel
- Control de acceso por roles mediante middleware
- Identidad visual propia: interfaz oscura, tipografía Cinzel y acentos en rojo burdeos
## Tecnologías
 
| Capa | Tecnología |
|------|-----------|
| Backend | Laravel 13 (PHP 8.4), Eloquent ORM |
| Frontend | React 18, Inertia.js |
| Base de datos | MySQL (Docker en desarrollo) |
| Pagos | Stripe Payment Elements |
| Bundler | Vite |
| Animaciones | Motion |
| Estilos | Tailwind CSS |
| Despliegue | Railway |
 
El proyecto emplea Inertia.js como capa de comunicación entre Laravel y React, lo que permite construir una SPA sin necesidad de una API REST independiente. Los controladores devuelven los datos directamente a los componentes de React como props, manteniendo la autenticación basada en sesiones de Laravel.
 
## Requisitos
 
- PHP 8.4
- Composer
- Node.js
- MySQL
## Instalación
 
```bash
git clone https://github.com/MOA9996/pandemonium.git
cd pandemonium
 
composer install
npm install
 
cp .env.example .env
php artisan key:generate
```
 
Configura las credenciales de la base de datos y de Stripe en el archivo `.env`:
 
```
DB_DATABASE=pandemonium
DB_USERNAME=usuario
DB_PASSWORD=contraseña
 
STRIPE_KEY=pk_test_xxxxx
STRIPE_SECRET=sk_test_xxxxx
```
 
Ejecuta las migraciones y crea el enlace simbólico del almacenamiento (necesario para servir las imágenes):
 
```bash
php artisan migrate
php artisan storage:link
```
 
Inicia el servidor de desarrollo y el compilador de assets en terminales separadas:
 
```bash
php artisan serve
npm run dev
```
 
La aplicación queda disponible en `http://localhost:8000`.
 
## Estructura del proyecto
 
```
pandemonium/
├── app/
│   ├── Http/Controllers/    # PrendaController, CarritoController, LookbookController, AdminController...
│   ├── Http/Middleware/     # AdminMiddleware (control de acceso por rol)
│   └── Models/              # User, Prenda, Compra, Lookbook, Opcion...
├── database/migrations/     # Definición de las tablas
├── resources/js/
│   ├── Pages/               # Vistas (Prendas, Carrito, Admin, Auth...)
│   ├── Layouts/             # AuthenticatedLayout
│   └── Components/
├── routes/web.php
└── storage/app/public/      # Imágenes de prendas y lookbooks
```
 
## Estado del proyecto
 
La aplicación es funcional y se encuentra desplegada en Railway. Funcionalidades previstas para próximas versiones:
 
- Diseño responsive para dispositivos móviles
- Webhooks de Stripe para la confirmación de pagos
- Configuración de Stripe en modo producción
- Normalización de las imágenes del catálogo
## Autor
 
Miguel Ollés Anglés — Trabajo de Fin de Grado, Desarrollo de Aplicaciones Web (2026).
