# Outsera Challenge

## Objetivo
Desenvolver uma interface para possibilitar a leitura da lista de indicados e vencedores da categoria "Pior Filme" do Golden Raspberry Awards.

## Visão geral
Este projeto é uma aplicação front-end criada com Vite, React e TypeScript. Ele fornece uma interface para navegar pela lista de indicados e vencedores, com páginas para Dashboard e Filmes, componentes reutilizáveis e integração com uma API.

Tecnologias principais:
- React 19 + TypeScript
- Vite
- Tailwind CSS
- @tanstack/react-query (cache e estado de dados assíncronos)
- React Router
- Axios
- ESLint + Prettier para qualidade de código

## Pré-requisitos
- Node.js (recomendado: versão LTS)
- npm (vem com o Node.js)

Verifique as versões instaladas:

```bash
node -v
npm -v
```

## Instalação

No diretório do projeto, instale as dependências:

```bash
npm install
```

## Scripts úteis
Os scripts definidos em `package.json`:

- Iniciar em modo desenvolvimento (Vite):

```bash
npm run dev
```

- Fazer build para produção:

```bash
npm run build
```

- Rodar preview do build (servidor estático local):

```bash
npm run preview
```

- Checar problemas de lint com ESLint:

```bash
npm run lint
```

- Tentar corrigir automaticamente problemas de lint:

```bash
npm run lint:fix
```

- Aplicar formatação automática com Prettier:

```bash
npm run format
```

- Verificar formatação (checagem):

```bash
npm run format:check
```

## Estrutura do projeto

Estrutura principal (resumida):

- `index.html` - entrada do Vite
- `vite.config.ts` - configuração do Vite
- `package.json` - scripts e dependências
- `tsconfig.app.json` / `tsconfig.node.json` - configurações TypeScript
- `.eslintrc.js` - configuração do ESLint
- `public/` - arquivos estáticos
- `src/` - código-fonte
  - `main.tsx` - bootstrap da aplicação
  - `App.tsx` - componente raiz / roteamento
  - `index.css` - estilos globais (Tailwind)
  - `assets/` - imagens e ativos
  - `components/` - componentes reutilizáveis
    - `Card/` - `Card.tsx`
    - `DataTable/` - `DataTable.tsx`, `FilterFields.tsx`, `Pagination.tsx`
    - `Header/` - `Header.tsx`
    - `Sidebar/` - `Sidebar.tsx`
    - `Skeleton/` - `Skeleton.tsx`
  - `interfaces/` - definições de tipos e interfaces
    - `data-table.interface.ts`
    - `movies.interface.ts`
  - `pages/` - páginas da aplicação
    - `Dashboard/` - `Dashboard.tsx`, `useDashboard.ts`, componentes (ProducerWinIntervals, TopStudios, WinnersByYear, YearsWithMultipleWinners)
    - `Movies/` - `Movies.tsx`, `useMovies.ts`
  - `services/` - chamadas à API
    - `api.ts`
    - `movies/` - `movies.service.ts`
  - `template/` - `Template.tsx`

> Observação: a lista acima reflete os arquivos e pastas presentes no repositório. Consulte `src/` para detalhes completos.

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação será servida por padrão em http://localhost:5173 (conforme configuração do Vite).

## Build e preview

Gerar build de produção:

```bash
npm run build
```

Executar um servidor de preview local do build:

```bash
npm run preview
```

## Lint e formatação

Verificação de lint:

```bash
npm run lint
```

Tentar corrigir automaticamente:

```bash
npm run lint:fix
```

Formatar o código com Prettier:

```bash
npm run format
```

Verificar formatação (não altera arquivos):

```bash
npm run format:check
```

## Dependências principais

Algumas dependências usadas neste projeto:

- react, react-dom
- react-router-dom
- @tanstack/react-query
- axios
- tailwindcss
- lucide-react

Dependências de desenvolvimento incluem: vite, typescript, eslint, prettier e plugins relacionados.

## Como contribuir

- Abra uma issue descrevendo o problema ou a feature desejada.
- Crie uma branch a partir de `main` com um nome descritivo.
- Faça commits pequenos e claros e envie um pull request.

## Observações finais

Este README foi atualizado para refletir a estrutura atual do projeto e os scripts disponíveis. Se desejar, posso adicionar instruções específicas para o ambiente de desenvolvimento (por exemplo: variáveis de ambiente, integração contínua ou comandos do Tailwind) — diga o que prefere.
