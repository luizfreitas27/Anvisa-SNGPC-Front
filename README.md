# SNGPC — Sistema Nacional de Gerenciamento de Produtos Controlados

Interface web para autenticação e envio de arquivos XML ao SNGPC (ANVISA).

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) 24+
- [Docker Compose](https://docs.docker.com/compose/install/) v2+

Verifique as versões instaladas:

```bash
docker --version
docker compose version
```

## Como executar

**1. Clone o repositório**

```bash
git clone <url-do-repositorio>
cd anvisa-test
```

**2. Suba a aplicação**

```bash
docker compose up --build
```

> Na primeira execução o build pode levar alguns minutos. Nas próximas será mais rápido pois as camadas ficam em cache.

**3. Acesse no navegador**

```
http://localhost:3000
```

## Rodando em segundo plano

```bash
docker compose up --build -d
```

Para acompanhar os logs:

```bash
docker compose logs -f
```

## Parando a aplicação

```bash
docker compose down
```

## Funcionalidades

| Tela | Descrição |
|---|---|
| `/` | Login com usuário e senha da ANVISA |
| `/dashboard` | Envio de arquivo XML ao SNGPC |
| `/dashboard` | Consulta de arquivo XML por e-mail, CNPJ e hash |

## Solução de problemas

**Porta 3000 já em uso**

Edite o `docker-compose.yml` e troque a porta:

```yaml
ports:
  - "8080:3000"  # acesse em http://localhost:8080
```

**Ver logs de erro da API externa**

Os logs das chamadas à API da ANVISA aparecem no terminal do container:

```bash
docker compose logs -f
```

**Rebuild completo após mudanças no código**

```bash
docker compose down
docker compose up --build
```
