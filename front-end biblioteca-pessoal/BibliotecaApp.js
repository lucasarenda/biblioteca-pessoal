/**
 * Orquestra a página: escuta clique nas abas, pede os dados pro
 * LivroApiService, e manda o EstadoView ou os LivroCard desenharem
 * o resultado. Não sabe fazer fetch, não sabe montar HTML de card -
 * só coordena quem sabe fazer cada coisa.
 */
class BibliotecaApp {
  constructor({ apiBase, logoSrc, tabsSelector, contentSelector, shelfLabelSelector, modalSelector }) {
    this.apiBase = apiBase;
    this.logoSrc = logoSrc;

    this.tabs = document.querySelectorAll(tabsSelector);
    this.content = document.querySelector(contentSelector);
    this.shelfLabel = document.querySelector(shelfLabelSelector);

    this.api = new LivroApiService(apiBase);
    this.estado = new EstadoView(this.content);
    this.modal = new LivroModal(modalSelector);

    this.statusAtual = "NEUTRO";
    this.livrosAtuais = [];

    this.LABELS = {
      NEUTRO: "Recém-adicionados",
      QUERO_LER: "Quero ler",
      LENDO: "Lendo agora",
      LIDO: "Já lidos"
    };
  }

  iniciar() {
    this.tabs.forEach(tab => {
      tab.addEventListener("click", () => this.selecionarAba(tab));
    });

    this.content.addEventListener("click", (evento) => {
      const card = evento.target.closest(".book");
      if (card) this.abrirDetalhes(card.dataset.id);
    });

    const abaInicial = document.querySelector(`[data-status="NEUTRO"]`);
    this.carregarStatus(abaInicial.dataset.status);
  }

  abrirDetalhes(id) {
    const livro = this.livrosAtuais.find(l => String(l.id) === String(id));
    if (!livro) return;

    this.modal.abrir(livro, (livroId, novoStatus) =>
      this.alterarStatusLivro(livroId, novoStatus)
    );
  }

  async alterarStatusLivro(id, novoStatus) {
    await this.api.atualizarStatus(id, novoStatus);
    await this.carregarStatus(this.statusAtual);
  }

  selecionarAba(tabClicada) {
    this.tabs.forEach(t => t.classList.remove("active"));
    tabClicada.classList.add("active");
    this.carregarStatus(tabClicada.dataset.status);
  }

  async carregarStatus(status) {
    this.statusAtual = status;
    this.shelfLabel.textContent = this.LABELS[status] || "";
    this.estado.mostrarCarregando();

    try {
      const livros = await this.api.buscarPorStatus(status);
      this.livrosAtuais = livros || [];
      this.renderizarLivros(this.livrosAtuais, status);
    } catch (erro) {
      console.error(erro);
      this.estado.mostrarErro(this.apiBase);
    }
  }

  renderizarLivros(livros, status) {
    this.estado.limparEstadoVisual();

    if (!livros || livros.length === 0) {
      this.estado.mostrarVazio(status, this.logoSrc);
      return;
    }

    const html = livros
      .map(livro => new LivroCard(livro).toHtml())
      .join("");

    this.content.innerHTML = html;
  }
}