package br.com.bibliotecapessoal.repository;

import br.com.bibliotecapessoal.model.Livro;
import br.com.bibliotecapessoal.model.StatusLeitura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LivroRepository extends JpaRepository<Livro,Long>{
    List<Livro> findByStatus(StatusLeitura statusLeitura);

}

