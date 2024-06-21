-   [x] Criar endpoint para dias da semana e cidades
-   [x] Criação de header, nav(Menu drop-down, breadcrumbs, Avatar) e footer
-   [x] Criação da tabela de usuarios
-   [x] Adicionar campo de busca na tabela (Filtros: Username e nome)
-   [x] Adicionar botão de deleção de usuario (On hover)
-   [x] Adiconar loading states da tabela
-   [x] Criação do perfil do usuario ([rotas dinâmicas], validação)
-   [x] Criação de rota de cadastro de usuario
-   [x] Criação do forms (validação e servers actions dele, forms shadcn, server-side)
-   [x] Correções gerais de layout
-   [x] correção de breakpoints (sm & lg)
-   [x] Correção da população da tabela (backend)

---

## Getting started

### Prerequisites

You need to have installed the following software:

-   [Go](https://golang.org/doc/install)
-   [Docker](https://docs.docker.com/install/)
-   [Docker Compose](https://docs.docker.com/compose/install/)
-   [Make](https://www.gnu.org/software/make/)
-   [Python3](https://www.python.org/downloads/)
-   [Pip](https://pip.pypa.io/en/stable/installation/)
-   [libpq-dev](https://pypi.org/project/libpq-dev/)
-   [PostgreSQL](https://www.postgresql.org/download/)
-   [Rustup](https://rustup.rs/)
-   [Sqlx](https://github.com/launchbadge/sqlx/blob/main/sqlx-cli/README.md)

### Installing

After installing the prerequisites, you need to install the dependencies of the project.

```bash
pip install load_dotenv
pip install psycopg2
```

After installing the dependencies, you need to build the database container. Make sure you have your .env file with the correct values, as exemplified in the .env.sample.

```bash
 docker compose up -d
```

After building the database container, you need to run the migrations.

```bash
make run_migrations
```

After running the migrations, populate the database with fake data

```bash
make populate_db
```

After that, you need to build and run the application.

```bash
make build
make run
```

---
