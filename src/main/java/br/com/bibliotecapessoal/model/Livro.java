package br.com.bibliotecapessoal.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity

@Table(name = "livros")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class
Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private StatusLeitura status;

    @Column(unique = true)
    private String titulo;

    private Integer numeroPaginas;

    private String capa;

    private String autor;

    private String categorias;

    @Column(length = 5000)
    private String sinopse;

    public Livro(VolumeInfo dados) {
        this.titulo = dados.titulo();
        this.numeroPaginas = dados.numeroPaginas();
        this.sinopse = dados.sinopse();
        this.status = StatusLeitura.NEUTRO;
        this.capa = dados.imageLinks() != null ? dados.imageLinks().thumbnail() : null;
        this.autor = dados.autores() != null ? String.join(", ", dados.autores()) : null;
        this.categorias = dados.categorias() != null ? String.join(", ", dados.categorias()) : null;
    }
}
