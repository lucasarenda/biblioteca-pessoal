// Ajuste aqui se sua API rodar em outra porta/host
const API_BASE = "http://localhost:8080";

const app = new BibliotecaApp({
  apiBase: API_BASE,
  logoSrc: "logo.png",
  tabsSelector: ".tab",
  contentSelector: "#content",
  shelfLabelSelector: "#shelfLabel",
  modalSelector: "#modalOverlay"
});

app.iniciar();