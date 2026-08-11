package br.com.bibliotecapessoal.exception;

public class LivroNaoEncontradoException extends RuntimeException {
    public LivroNaoEncontradoException(String mensagem) {
        super(mensagem);
    }
}
