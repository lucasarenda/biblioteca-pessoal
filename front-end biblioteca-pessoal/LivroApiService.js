/**
 * Única classe que sabe conversar com o backend.
 * Se um dia a URL da API mudar, ou o formato da resposta mudar,
 * é aqui (e só aqui) que se mexe.
 */
class LivroApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async buscarPorStatus(status) {
    const resposta = await fetch(`${this.baseUrl}/livros/buscar/status/${status}`);

    if (!resposta.ok) {
      throw new Error(`Erro na resposta da API: ${resposta.status}`);
    }

    return resposta.json();
  }

  async atualizarStatus(id, statusLeitura) {
    const url = `${this.baseUrl}/livros/${id}/status?statusLeitura=${statusLeitura}`;
    const resposta = await fetch(url, { method: "PUT" });

    if (!resposta.ok) {
      throw new Error(`Erro ao atualizar status: ${resposta.status}`);
    }

    return resposta.json();
  }
}