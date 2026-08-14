
class LivroCard {
  constructor(livro) {
    this.id = livro.id;
    this.titulo = livro.titulo || "Título indisponível";
    this.autor = livro.autor || null;
    this.capa = livro.capa || null;
  }

  static escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  renderCapa() {
    if (!this.capa) {
      return this.renderCapaFallback();
    }
    const tituloEscapado = LivroCard.escapeHtml(this.titulo);
    return `
      <img
        src="${this.capa}"
        alt=""
        loading="lazy"
        onerror="this.parentElement.innerHTML='${this.fallbackMarkupInline(tituloEscapado)}'"
      >
    `;
  }

  renderCapaFallback() {
    return `<div class="cover-fallback">${LivroCard.escapeHtml(this.titulo)}</div>`;
  }

  // versão em string única, usada dentro do atributo onerror (sem quebras de linha)
  fallbackMarkupInline(tituloEscapado) {
    return `<div class=&quot;cover-fallback&quot;>${tituloEscapado}</div>`;
  }

  toHtml() {
    const autorHtml = this.autor
      ? `<p class="book-author">${LivroCard.escapeHtml(this.autor)}</p>`
      : "";

    return `
      <div class="book" data-id="${this.id}">
        <div class="cover-wrap">
          ${this.renderCapa()}
        </div>
        <p class="book-title">${LivroCard.escapeHtml(this.titulo)}</p>
        ${autorHtml}
      </div>
    `;
  }
}