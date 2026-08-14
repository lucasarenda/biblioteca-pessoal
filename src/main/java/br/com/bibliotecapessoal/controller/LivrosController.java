package br.com.bibliotecapessoal.controller;

import br.com.bibliotecapessoal.exception.LivroJaCadastradoException;
import br.com.bibliotecapessoal.exception.LivroNaoEncontradoException;
import br.com.bibliotecapessoal.model.Livro;
import br.com.bibliotecapessoal.model.StatusLeitura;
import br.com.bibliotecapessoal.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.*;

import java.util.List;

@RestController
@RequestMapping("/livros")
public class LivrosController {
    @Autowired
    private LivroService service;

    @PostMapping("/importar")
    public Livro importarLivro(@RequestParam String titulo) {

        return service.adicionarLivro(titulo);
    }

    @DeleteMapping("/{id}")
    public Livro removePorId(@PathVariable Long id){

        return service.removerLivroId(id);
    }
    @GetMapping("/buscar")

    public List<Livro>  buscarTodos(){
       return service.buscarTodosLivros();
    }

    @GetMapping("/buscar/{id}")
    public Livro buscaPorId(@PathVariable Long id){

        return service.buscaLivroId(id);
    }

    @ExceptionHandler(LivroNaoEncontradoException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleLivroNaoEncontrado(LivroNaoEncontradoException e) {

        return e.getMessage();
    }

    @ExceptionHandler(LivroJaCadastradoException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public String handleLivroJaCadastrado(LivroJaCadastradoException e) {

        return e.getMessage();
    }

    @PutMapping("/{id}/status")
    public Livro alterarStatus(@PathVariable Long id, @RequestParam StatusLeitura statusLeitura) {

        return service.atualizarStatus(id, statusLeitura);
    }
    @GetMapping("/buscar/status/{statusLeitura}")
    public List<Livro> buscaPorStatus(@PathVariable StatusLeitura statusLeitura){

        return service.buscaPorStatus(statusLeitura);
    }
}
