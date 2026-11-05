// Configuración compartida por la tienda (/) y el panel (/admin).
// La apiKey de Firebase web es pública por diseño: la seguridad la dan las reglas de Firestore (firestore.rules).
export const firebaseConfig = {
  apiKey: "AIzaSyDd_Z5PmJvcWOtoxar2TA8OfYPKq57RFq0",
  authDomain: "amilkar-75996.firebaseapp.com",
  projectId: "amilkar-75996",
  storageBucket: "amilkar-75996.firebasestorage.app",
  messagingSenderId: "170674280961",
  appId: "1:170674280961:web:eff615ab0e3ef2922afe00"
};

export const cloudinary = {
  cloudName: "bzrjdfnu",
  uploadPreset: "Amilkarbiker",
  folder: "amilkar-biker-shop/productos"
};

// El panel permite entrar con el usuario (sin @). Se completa con este dominio.
export const ADMIN_EMAIL_DOMAIN = "amilkarbikershop.3s-dev.com";
export const usuarioAEmail = u => {
  u = String(u || "").trim().toLowerCase();
  return u.includes("@") ? u : `${u}@${ADMIN_EMAIL_DOMAIN}`;
};

// Valores por defecto (se usan mientras el administrador no guarde los suyos en Ajustes).
export const configBase = {
  nombre: "Amilkar Biker Shop",
  whatsapp: "584126833301",
  telefonoVisible: "+58 412 683 3301",
  instagram: "https://www.instagram.com/amilkarbikershop/",
  facebook: "",
  tiktok: "",
  email: "",
  tasa: 0,
  mostrarBs: true,
  anuncio: "",
  envios: "Delivery en Maracaibo y envíos a toda Venezuela. Consulta costos por WhatsApp.",
  sedes: [
    { nombre: "Av. Delicias", direccion: "Maracaibo, Zulia", horario: "", mapa: "" },
    { nombre: "La Curva de Molina", direccion: "Maracaibo, Zulia", horario: "", mapa: "" }
  ]
};

// Iconos disponibles para las categorías (deben existir en assets/icons.svg).
export const iconosCategoria = ["helmet", "glove", "jacket", "light", "wrench", "bag", "tire", "oil", "spark", "shield", "tag", "box", "truck", "star"];

// Categorías iniciales (el panel puede crearlas con un clic y luego editarlas).
export const categoriasBase = [
  { id: "cascos", nombre: "Cascos", icono: "helmet" },
  { id: "guantes", nombre: "Guantes", icono: "glove" },
  { id: "chaquetas", nombre: "Chaquetas", icono: "jacket" },
  { id: "luces", nombre: "Luces", icono: "light" },
  { id: "repuestos", nombre: "Repuestos", icono: "wrench" },
  { id: "equipaje", nombre: "Equipaje", icono: "bag" },
  { id: "cauchos", nombre: "Cauchos", icono: "tire" },
  { id: "aceites", nombre: "Aceites y lubricantes", icono: "oil" },
  { id: "accesorios", nombre: "Accesorios", icono: "spark" }
].map((c, i) => ({ ...c, orden: i, activa: true }));

export const estadosPedido = {
  nuevo: "Nuevo",
  confirmado: "Confirmado",
  pagado: "Pagado",
  entregado: "Entregado",
  cancelado: "Cancelado"
};

// Optimiza una URL de Cloudinary (formato y calidad automáticos, ancho máximo).
export function cl(url, w = 600) {
  if (!url || !url.includes("/upload/")) return url || "";
  return url.replace("/upload/", `/upload/f_auto,q_auto,c_limit,w_${w}/`);
}

// Carga el sprite de iconos SVG dentro de la página (una sola fuente para tienda y panel).
export async function cargarIconos(base = "") {
  try {
    const r = await fetch(base + "assets/icons.svg");
    const t = await r.text();
    const d = document.createElement("div");
    d.innerHTML = t;
    document.body.prepend(d.firstElementChild);
  } catch (e) { console.warn("Iconos no cargados", e); }
}

export const slugify = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "")
  .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);

// Precio final de un producto según la medida/talla elegida.
export function precioDe(p, talla) {
  const t = (p.tallas || []).find(x => x.nombre === talla);
  const v = t && t.precio > 0 ? t.precio : p.precio;
  return Number(v) || 0;
}
