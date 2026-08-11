# Biblioteca Pessoal

Projeto em desenvolvimento - API para gerenciar livros lidos,quero ler e lendo,
com integração à Google Books API.

## Tecnologias
- Java 17 + Spring Boot
- PostgreSQL (Supabase)
- Google Books API

## Status
🚧 Em construção

## Como rodar

1. Clone o repositório
2. Configure as variáveis de ambiente necessárias:

| Variável | Descrição |
|---|---|
| `SUPABASE_DB_URL` | URL de conexão JDBC do banco Postgres (Supabase) |
| `SUPABASE_DB_USER` | Usuário do banco |
| `SUPABASE_DB_PASSWORD` | Senha do banco |
| `GOOGLE_BOOKS_API_KEY` | Chave de API da Google Books API |

3. No IntelliJ: Run → Edit Configurations → Environment variables → adicione as 4 variáveis acima
4. Rode a classe `LibraryApplication.java`
