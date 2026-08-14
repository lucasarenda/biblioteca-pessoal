# 📚 Biblioteca Pessoal

Um sistema para organizar os livros que você já leu, está lendo, ou quer ler — com importação automática de dados (capa, autor, sinopse) direto da **Google Books API**.

> 🚧 Projeto em desenvolvimento, feito como parte do meu aprendizado em desenvolvimento backend e frontend.

---

## 🖼️ Como funciona

A tela inicial mostra os livros recém-importados. As abas separam por status de leitura (Quero ler / Lendo / Lido). Clicando em um livro, abre um modal com a sinopse e opções para mudar o status.

---

## 🛠️ Tecnologias usadas

**Backend**
- Java 17
- Spring Boot (Web, Data JPA)
- PostgreSQL (hospedado no [Supabase](https://supabase.com))
- Google Books API (para importar dados dos livros)
- Maven

**Frontend**
- HTML, CSS e JavaScript puro (sem framework), organizado em classes com responsabilidade única

---

## 📁 Estrutura do projeto

```
biblioteca-pessoal/
├── src/                     → código do backend (Java/Spring)
├── frontend/                → código do frontend (HTML/CSS/JS)
│   ├── index.html
│   ├── style.css
│   ├── BibliotecaApp.js
│   ├── LivroCard.js
│   ├── LivroModal.js
│   ├── EstadoView.js
│   ├── LivroApiService.js
│   ├── main.js
│   └── logo.png
├── pom.xml
└── README.md
```

---

## ✅ Pré-requisitos

Antes de começar, você precisa ter instalado:

- **[Java 17](https://adoptium.net/)** (ou superior)
- **[IntelliJ IDEA](https://www.jetbrains.com/idea/download/)** (Community já serve) — ou outra IDE de sua preferência
- **[Git](https://git-scm.com/downloads)**
- Uma extensão de **Live Server** no seu editor (se for usar VS Code para o frontend) — ou qualquer outro jeito de servir arquivos estáticos localmente
- Uma conta gratuita no **[Supabase](https://supabase.com)** (banco de dados)
- Uma conta no **[Google Cloud Console](https://console.cloud.google.com)** (para gerar a chave da Google Books API)
- Opcional: **[Postman](https://www.postman.com/downloads/)** ou **[Insomnia](https://insomnia.rest/download)**, para testar a API (também é possível testar apenas com o terminal, como mostrado mais abaixo)

---

## 🚀 Passo a passo para rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/lucasarenda/biblioteca-pessoal.git
cd biblioteca-pessoal
```

### 2. Crie um banco de dados no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta (pode entrar com GitHub)
2. Clique em **New Project**
3. Escolha um nome, gere uma senha forte (Supabase tem um botão de "Generate a password" — use ele, e **guarde essa senha** em um lugar seguro, ela só aparece uma vez)
4. Escolha a região mais próxima de você e crie o projeto
5. Depois que o projeto for criado, vá em **Connect** (topo da página) → escolha a opção **Session pooler** → copie a connection string. Ela terá esse formato:
   ```
   postgresql://postgres.xxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-regiao.pooler.supabase.com:5432/postgres
   ```
6. Guarde essas 3 informações separadas, você vai precisar delas no passo 4:
   - **Host**: `aws-0-regiao.pooler.supabase.com`
   - **Usuário**: `postgres.xxxxxxxxxxxx`
   - **Senha**: a que você gerou no passo 3

> Não precisa criar nenhuma tabela manualmente — a aplicação cria a tabela `livros` sozinha na primeira vez que rodar.

### 3. Gere uma chave da Google Books API

1. Acesse o [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto (canto superior esquerdo → **New Project**)
3. Com o projeto selecionado, vá em **APIs & Services → Library**
4. Busque por **"Books API"** e clique em **Enable**
5. Vá em **APIs & Services → Credentials → Create Credentials → API Key**
6. Copie a chave gerada

### 4. Configure as variáveis de ambiente no IntelliJ

O projeto não guarda nenhuma senha ou chave dentro do código — tudo vem de variáveis de ambiente, configuradas por fora.

1. Abra o projeto no IntelliJ
2. Vá em **Run → Edit Configurations**
3. Selecione a configuração da aplicação (`LibraryApplication`)
4. Clique em **Modify options → Environment variables**
5. Adicione as 4 variáveis, com os valores que você guardou nos passos 2 e 3:

```
SUPABASE_DB_URL=jdbc:postgresql://aws-0-regiao.pooler.supabase.com:5432/postgres
SUPABASE_DB_USER=postgres.xxxxxxxxxxxx
SUPABASE_DB_PASSWORD=sua_senha_do_supabase
GOOGLE_BOOKS_API_KEY=sua_chave_do_google_books
```

6. Clique em **Apply** e **OK**

### 5. Rode o backend

Execute a classe `LibraryApplication.java` (botão ▶️ verde no IntelliJ).

Se tudo estiver certo, o console vai mostrar algo como:
```
Tomcat started on port(s): 8080
```

Isso significa que sua API já está no ar, em `http://localhost:8080`.

### 6. Popule o banco com alguns livros

Como o banco começa **vazio**, você precisa importar alguns livros antes de abrir o frontend — senão a tela vai aparecer sem nada. Isso é feito fazendo requisições diretas à API (ainda não existe um botão no site para isso — veja a seção **Limitações atuais**, mais abaixo).

Você pode fazer isso de duas formas:

#### Opção A — pelo terminal (funciona em qualquer sistema, sem instalar nada)

Copie e cole cada linha abaixo no seu terminal (PowerShell, Terminal do Mac/Linux, ou o terminal do próprio IntelliJ), uma de cada vez:

```bash
curl -X POST "http://localhost:8080/livros/importar?titulo=harry+potter"
curl -X POST "http://localhost:8080/livros/importar?titulo=1984+george+orwell"
curl -X POST "http://localhost:8080/livros/importar?titulo=o+pequeno+principe"
```

#### Opção B — pelo Postman ou Insomnia

1. Crie uma nova requisição
2. Método: `POST`
3. URL: `http://localhost:8080/livros/importar?titulo=harry+potter`
4. Não precisa preencher nada no corpo (Body) da requisição
5. Clique em **Send**

Repita trocando o valor de `titulo` para importar outros livros.

### 7. Rode o frontend

1. Abra a pasta `frontend/` no VS Code (ou seu editor de preferência)
2. Clique com o botão direito em `index.html` → **Open with Live Server**
   (ou simplesmente dê duplo clique no `index.html` para abrir direto no navegador)
3. A página deve carregar mostrando os livros que você importou no passo 6

> Se a página abrir mas os livros não aparecerem, confira o **Console** do navegador (F12) — o erro mais comum é o backend não estar rodando, ou a porta configurada em `frontend/main.js` (`API_BASE`) não bater com a porta real da sua aplicação.

---

## 📖 Todas as rotas disponíveis na API

Essas são todas as ações que a API aceita. Você pode testá-las pelo terminal (`curl`) ou por qualquer ferramenta tipo Postman/Insomnia.

| Ação | Método | URL | Exemplo |
|---|---|---|---|
| Importar um livro novo | `POST` | `/livros/importar?titulo={titulo}` | `curl -X POST "http://localhost:8080/livros/importar?titulo=dom+casmurro"` |
| Listar todos os livros | `GET` | `/livros/buscar` | `curl http://localhost:8080/livros/buscar` |
| Buscar um livro pelo ID | `GET` | `/livros/buscar/{id}` | `curl http://localhost:8080/livros/buscar/1` |
| Listar livros por status | `GET` | `/livros/buscar/status/{status}` | `curl http://localhost:8080/livros/buscar/status/QUERO_LER` |
| Mudar o status de um livro | `PUT` | `/livros/{id}/status?statusLeitura={status}` | `curl -X PUT "http://localhost:8080/livros/1/status?statusLeitura=LIDO"` |
| Remover um livro | `DELETE` | `/livros/{id}` | `curl -X DELETE http://localhost:8080/livros/1` |

Os valores possíveis para `status`/`statusLeitura` são: `NEUTRO`, `QUERO_LER`, `LENDO`, `LIDO`.

---

## ⚠️ Limitações atuais (o que ainda não dá pra fazer pela tela)

Esse projeto está em construção, e algumas funcionalidades ainda existem só na API, sem botão correspondente no site ainda:

- **Adicionar um livro novo** → hoje só é possível via requisição direta (`POST /livros/importar`, veja a seção acima). Ainda não existe uma barra de busca no frontend para isso.

Essa funcionalidade está nos próximos passos do projeto.

## 👤 Autor

**Lucas Arenda Silveira**
Estudante de Sistemas de Informação
[LinkedIn](https://linkedin.com/in/lucas-arenda-76775b2aa) · [GitHub](https://github.com/lucasarenda)
