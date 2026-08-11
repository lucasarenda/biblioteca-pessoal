package br.com.bibliotecapessoal.model;

import jakarta.persistence.*;
import lombok.*;

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

    public Livro(VolumeInfo dados) {
        this.titulo = dados.titulo();
        this.numeroPaginas = dados.numeroPaginas();
        this.status = StatusLeitura.QUERO_LER;
        this.capa = dados.imageLinks() != null ? dados.imageLinks().thumbnail() : null;
    }
}
