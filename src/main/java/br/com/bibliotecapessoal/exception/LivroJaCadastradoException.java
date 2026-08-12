package br.com.bibliotecapessoal.exception;

public class LivroJaCadastradoException extends RuntimeException {
    public LivroJaCadastradoException(String message) {
        super(message);
    }
}
