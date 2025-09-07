# teste-react

## Instruções

### API

Necessária pra carregar as notícias da página de notícias. Escuta requisições na porta 8000;

```sh
cd src-api
npm i
npm run start
```

O local onde fica salvo o arquivo `news.json`, no qual ficam salvas as notícias, é por padrão na pasta home do usuário (`~/news.json`). Isso pode ser alterado configurando a variável de ambiente `NEWS_JSON_PATH`, fornecendo-a um caminho dentro de um **diretório existente**.

Por exemplo:

```sh
NEWS_JSON_PATH="~/teste-react/news.json" npm run start
```

O mesmo vale pro arquivo de usuários, `users.json`, que pode ser alterado usando a variável `USERS_JSON_PATH`.

Por exemplo:

```sh
USERS_JSON_PATH="~/teste-react/users.json" npm run start
```

O "secret" utilizado pela biblioteca `jsonwebtoken`, que por padrão está exposto no código por motivos de demonstração, também é configurável pela variável `JWT_SECRET`.

```sh
JWT_SECRET="ChaveSecreta" npm run start
```

### Portfólio

```sh
cd src-portifolio
npm i
npm run dev
```

Abra o navegador na página [http://localhost:5173/](http://localhost:5173/).

## Capturas de tela

Para fins de demonstração, as capturas de tela desse projeto estão na pasta [screenshots](./screenshots), organizadas por dispositivo e tema.

## (README Original) Teste de aplicação react em TSx com Vite

- Crie um site portfólio com ViteJS, tSX onde tenha páginas estáticas e uma página dinâmica de notícias. Use ContextAPI, react icons e react router dom, axios e boas praticas com CSS ou SCSS
  Aplique responsividade e acessibilidade
- A API deve ser um arquivo json segregado da aplicação
- Estruture a arquitetura de diretórios
- Adote clean template
