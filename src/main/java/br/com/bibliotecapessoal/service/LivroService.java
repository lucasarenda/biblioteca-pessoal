package br.com.bibliotecapessoal.service;


import br.com.bibliotecapessoal.exception.LivroNaoEncontradoException;
import br.com.bibliotecapessoal.model.DadosLivro;
import br.com.bibliotecapessoal.model.Livro;
import br.com.bibliotecapessoal.model.StatusLeitura;
import br.com.bibliotecapessoal.model.VolumeInfo;
import br.com.bibliotecapessoal.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LivroService {

    private ConsumoApi consumo = new ConsumoApi();
    private ConverteDados conversor = new ConverteDados();
    private final String ENDERECO_BASE = "https://www.googleapis.com/books/v1/volumes?q=";

    @Value("${google.books.api.key}")
    private String apiKey;

    @Autowired
    private LivroRepository repository;

    private VolumeInfo getDadosLivro(String titulo) {
        var json = consumo.obterDados(ENDERECO_BASE + titulo.replace(" ", "+") + "&key=" + apiKey);
        DadosLivro dados = conversor.obterDados(json, DadosLivro.class);
        return dados.items().get(0).volumeInfo();
    }

    public Livro adicionarLivro(String titulo) {
        try {
            VolumeInfo dados = getDadosLivro(titulo);
            Livro livro = new Livro(dados);
            return repository.save(livro);
        } catch (IndexOutOfBoundsException e) {
            throw new LivroNaoEncontradoException("Livro não encontrado: " + titulo);
        }
    }
    public Livro removerLivroId(Long id) {
        Livro livro = repository.findById(id)
                .orElseThrow(() -> new LivroNaoEncontradoException("Livro não encontrado"));
        repository.delete(livro);
        return livro;
    }
    public Livro buscaLivroId(Long id) {
        Livro livro = repository.findById(id)
                .orElseThrow(() -> new LivroNaoEncontradoException(("Livro não encontrado")));
        return livro;
    }
    public Livro atualizarStatus(Long id, StatusLeitura novoStatus) {
        Livro livro = repository.findById(id)
                .orElseThrow(() -> new LivroNaoEncontradoException("Livro não encontrado"));
        livro.setStatus(novoStatus);
        return repository.save(livro);
    }
    public List<Livro> buscaPorStatus(StatusLeitura statusLeitura) {
        return repository.findByStatus(statusLeitura);
    }

    public List<Livro> buscarTodosLivros() {
        return repository.findAll();
    }
}


