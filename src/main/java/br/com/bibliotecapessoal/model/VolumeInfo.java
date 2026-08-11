package br.com.bibliotecapessoal.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record VolumeInfo(
        @JsonProperty("title") String titulo,
        @JsonProperty("authors") List<String> autores,
        @JsonProperty("description") String sinopse,
        @JsonProperty("categories") List<String> categorias,
        @JsonProperty("pageCount") Integer numeroPaginas,
        @JsonProperty("imageLinks") ImageLinks imageLinks
) {
}