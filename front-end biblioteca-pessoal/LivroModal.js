/**
 * Cuida só do modal de detalhes: abrir, fechar, desenhar as informações
 * do livro selecionado, e os 3 botões de status.
 * Não sabe fazer fetch, não sabe montar card - só recebe os dados
 * do livro já prontos e uma função de callback pra quando o status mudar.
 */
class LivroModal {
  constructor(overlaySelector) {
    this.overlay = document.querySelector(overlaySelector);
    this.onStatusChange = null;

    this.overlay.addEventListener("click", (evento) => {
      if (evento.target === this.overlay) this.fechar();
    });

    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape") this.fechar();
    });
  }

  static STATUS_OPCOES = [
    { valor: "QUERO_LER", rotulo: "Quero ler" },
    { valor: "LENDO", rotulo: "Lendo" },
    { valor: "LIDO", rotulo: "Lido" }
  ];

  abrir(livro, onStatusChange) {
    this.livroAtual = livro;
    this.onStatusChange = onStatusChange;

    this.overlay.innerHTML = this.montarMarkup(livro);
    this.overlay.classList.add("aberto");
    document.body.style.overflow = "hidden";

    this.overlay.querySelector(".modal-fechar")
      .addEventListener("click", () => this.fechar());

    this.overlay.querySelectorAll(".status-btn").forEach(btn => {
      btn.addEventListener("click", () => this.selecionarStatus(btn.dataset.status));
    });
  }

  fechar() {
    this.overlay.classList.remove("aberto");
    document.body.style.overflow = "";
    setTimeout(() => { this.overlay.innerHTML = ""; }, 200);
  }

  async selecionarStatus(novoStatus) {
    if (!this.onStatusChange) return;

    const botoes = this.overlay.querySelectorAll(".status-btn");
    botoes.forEach(b => b.disabled = true);

    try {
      await this.onStatusChange(this.livroAtual.id, novoStatus);
      this.fechar();
    } catch (erro) {
      console.error(erro);
      botoes.forEach(b => b.disabled = false);
    }
  }

  montarMarkup(livro) {
    const titulo = LivroCard.escapeHtml(livro.titulo || "Título indisponível");
    const autor = livro.autor ? LivroCard.escapeHtml(livro.autor) : null;
    const categoria = livro.categoria ? LivroCard.escapeHtml(livro.categoria) : null;
    const sinopse = livro.sinopse ? LivroCard.escapeHtml(livro.sinopse) : "Sinopse não disponível para este livro.";
    const paginas = livro.numeroPaginas ? `${livro.numeroPaginas} páginas` : null;

    const capaHtml = livro.capa
      ? `<img src="${livro.capa}" alt="">`
      : `<div class="modal-capa-fallback">${titulo}</div>`;

    const metaLinha = [autor, categoria, paginas].filter(Boolean).join(" · ");

    const botoesHtml = LivroModal.STATUS_OPCOES.map(opcao => `
      <button
        class="status-btn ${livro.status === opcao.valor ? 'is-current' : ''}"
        data-status="${opcao.valor}"
      >
        ${opcao.rotulo}
      </button>
    `).join("");

    return `
      <div class="modal-panel" role="dialog" aria-modal="true">
        <button class="modal-fechar" aria-label="Fechar">&times;</button>
        <div class="modal-body">
          <div class="modal-capa">${capaHtml}</div>
          <div class="modal-info">
            <h2>${titulo}</h2>
            ${metaLinha ? `<p class="modal-meta">${metaLinha}</p>` : ""}
            <p class="modal-sinopse">${sinopse}</p>
            <div class="modal-status">
              <span class="modal-status-label">Marcar como</span>
              <div class="status-btn-group">${botoesHtml}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}