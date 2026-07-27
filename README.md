# OdontoNorte

Projeto didático de clínica odontológica com Python, PostgreSQL, Bootstrap e Docker.

## 1. Preparação das variáveis locais

Na pasta principal do projeto, copie o arquivo `.env.example` para `.env`:

```powershell
Copy-Item .env.example .env_py
```

Edite o `.env` e informe uma senha local. O arquivo `.env` não deve ser enviado ao GitHub.

## 2. Execução com Docker

Abra a pasta do projeto no VS Code e execute:

```powershell
docker compose config
docker compose up --build -d
docker compose ps
```

Acessos:
4. Abra no browser:
5. `http://localhost:8087` - FRONTEND
7. `http://localhost` - FRONTEND
8. `http://localhost:8081` - DB

## 3. Dados para acesso ao Adminer

- Sistema: PostgreSQL
- Servidor: `postgres`
- Usuário: `odonto_user`
- Senha: valor definido em `POSTGRES_PASSWORD` no arquivo `.env`
- Base de dados: `db_odonto_norte`

Dentro da rede Docker, o servidor do banco é `postgres` e a porta é `5432`.

## 4. Backend Python executado fora do contêiner

Suba somente o PostgreSQL e o Adminer:

```powershell
docker compose up -d postgres adminer
```

Entre na pasta do backend Python:

```powershell
cd backend\python
python -m venv .env_py
.\.venv_py\Scripts\Activate.ps1
pip install -r requirements.txt
```

Crie o arquivo local `.env` a partir do exemplo correspondente e use:

```env
DB_HOST=localhost
DB_PORT=5436
DB_NAME=db_odonto_norte
DB_USER=aluno
DB_PASSWORD=aluno123
```

Quando o Python roda diretamente no Windows, use `localhost:5436`. Quando roda dentro do Docker, use `postgres:5432`.

## 5. Relatório Python

```powershell
cd backend\python
.\.venv\Scripts\Activate.ps1
python relatorio_consultas.py
```

## 6. Publicação no GitHub

Podem ser publicados:

- `.env.example`
- `.gitignore`
- `docker-compose.yml`
- código-fonte e documentação

Não publique:

- `.env`
- `backend/.env`
- `backend/python/.env`

Antes do commit, confirme:

```powershell
git status
```

### TAREFA (DESAFIO)
-
-criar tela de cadastro de dentista
  1. inclusão/exclusão/consulta/alteração
   
-criar tela de cadastro de consulta médicas
  1. inclusão/exclusão/consulta/alteração
  2. mudança de andamento da consulta
  3. alterar médico que realizará a consulta.
