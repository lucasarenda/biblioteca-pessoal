package br.com.bibliotecapessoal.exception;

public class LivroJaCadastrado extends RuntimeException {
  public LivroJaCadastrado(String message) {
    super(message);
  }
}
