package br.com.bibliotecapessoal.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ImageLinks(
        @JsonProperty("thumbnail") String thumbnail
) {
}