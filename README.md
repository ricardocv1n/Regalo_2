# 💖 App de Recuerdos Románticos

¡Bienvenido/a a tu app personalizada de recuerdos y sorpresas románticas! Este proyecto es un espacio digital para celebrar, revivir y crear momentos especiales en pareja, con secciones interactivas, multimedia y sorpresas desbloqueables.

---

## ✨ Características principales
- **Inicio:** Canción del día, carrusel de recuerdos y bienvenida personalizada.
- **Recuerdos:** Línea de tiempo de hitos, lugares especiales en mapa, edición y galería.
- **Mensajes:** Mensajes románticos, favoritos y persistentes.
- **Fotos:** Galería tipo Pinterest con imágenes y videos reales.
- **Música:** Reproductor robusto con playlist de canciones reales.
- **Sorpresas:** Cajitas desbloqueables con poemas, álbum, video, juegos, cupones y más.
- **Desbloqueo progresivo:** Sorpresas que se abren cada 15 días con clave especial.
- **Persistencia:** Todo lo importante se guarda en localStorage.

---

## 🚀 Instalación y ejecución local

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
   ```
2. **Instala dependencias:**
   ```bash
   npm install
   # o
   yarn install
   ```
3. **Crea tu archivo de entorno:**
   - Copia `.env.example` a `.env.local` y agrega tus claves (por ejemplo, Google Maps API).
4. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   # o
   yarn dev
   ```
5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🗂️ Estructura del proyecto

```
app/
  (interior)/
    recuerdos/      # Sección de recuerdos y lugares
    mensajes/       # Sección de mensajes románticos
    fotos/          # Galería de fotos y videos
    musicas/        # Reproductor de música
    sorpresas/      # Sorpresas desbloqueables
    planes/         # Planes y metas juntos
  inicio/           # Página de bienvenida
components/         # Componentes reutilizables
public/assets/      # Imágenes, videos y música reales
styles/             # Estilos globales
```

---

## 🛠️ Tecnologías usadas
- **Next.js** (App Router)
- **React**
- **Tailwind CSS**
- **TypeScript**
- **Google Maps API**
- **React Masonry** (galería)
- **Lucide Icons**

---

## 🎨 Personalización
- Cambia imágenes, videos y música en `public/assets/`.
- Edita textos, poemas y sorpresas en los archivos de cada sección.
- Agrega nuevas cajitas sorpresa fácilmente en `app/(interior)/sorpresas/page.tsx`.

---

## ☁️ Despliegue
- **Vercel:** Recomendado para Next.js. Solo haz push a tu repo y conecta en [vercel.com](https://vercel.com/).
- **GitHub Pages:** Solo para export estático (`next export`).

---

## ❤️ Créditos y agradecimientos
Este proyecto fue creado con mucho amor, dedicación y ayuda de IA para celebrar una historia única. ¡Disfruta cada recuerdo y sigue creando momentos inolvidables!

---

## 📬 Contacto
¿Tienes dudas, sugerencias o quieres personalizar aún más tu app? ¡Escríbeme o abre un issue en el repo! 