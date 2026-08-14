/**
 * Cuida de tudo que não é "lista de livros normal":
 * skeleton de carregamento, estado vazio e estado de erro.
 * Recebe o container onde deve desenhar, e só isso.
 */
class EstadoView {
  constructor(containerEl) {
    this.container = containerEl;
  }

  static MENSAGENS_VAZIO = {
    NEUTRO: "Livros importados aparecem aqui primeiro. Adicione um título para começar sua estante.",
    QUERO_LER: "Você ainda não marcou nenhum livro como \u201cquero ler\u201d.",
    LENDO: "Nenhum livro em andamento no momento.",
    LIDO: "Os livros que você concluir vão aparecer aqui."
  };

  mostrarCarregando(quantidade = 6) {
    this.container.classList.add("skeleton");
    this.container.innerHTML = Array.from({ length: quantidade }).map(() => `
      <div class="book">
        <div class="cover-wrap"></div>
        <p class="book-title">&nbsp;</p>
        <p class="book-author">&nbsp;</p>
      </div>
    `).join("");
  }

  mostrarVazio(status, logoSrc) {
    this.container.classList.remove("skeleton");
    const mensagem = EstadoView.MENSAGENS_VAZIO[status] || "Nada por aqui ainda.";

    this.container.innerHTML = `
      <div class="state">
        <img src="${logoSrc}" alt="">
        <h2>Nenhum livro por aqui ainda</h2>
        <p>${mensagem}</p>
      </div>
    `;
  }

  mostrarErro(apiBase) {
    this.container.classList.remove("skeleton");
    this.container.innerHTML = `
      <div class="state error">
        <h2>Não foi possível carregar sua estante</h2>
        <p>Confira se a API está rodando em <strong>${apiBase}</strong> e se o CORS está liberado para este endereço.</p>
      </div>
    `;
  }

  limparEstadoVisual() {
    this.container.classList.remove("skeleton");
  }
}