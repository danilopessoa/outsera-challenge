# Outsera Challenge

## Objetivo

Desenvolver uma interface para possibilitar a leitura da lista de indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards.

## Visão geral

Projeto criado com Vite + React + TypeScript. Contém a configuração padrão do Vite, regras de lint com ESLint + Prettier e configuração TypeScript dividida entre `tsconfig.app.json` (app) e `tsconfig.node.json` (ferramentas).

## Stack / Tecnologias

- Node.js (recomendado LTS)
- npm
- Vite
- React
- TypeScript
- ESLint + @typescript-eslint
- Prettier

## Pré-requisitos

- Node.js instalado (recomenda-se versão LTS)
- npm (vem com Node.js)

Verifique a versão instalada:

```bash
node -v
npm -v
```

## Instalação

Abra um terminal no diretório do projeto e instale dependências:

```bash
npm install
```

## Scripts úteis

Os scripts disponíveis neste projeto (conforme `package.json`) e como usá-los:

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

- Tentar corrigir automaticamente problemas de lint (opções aplicáveis):

```bash
npm run lint:fix
```

- Verificar formatação com Prettier (checagem):

```bash
npm run format:check
```

- Aplicar formatação automática com Prettier (escrever nos arquivos):

```bash
npm run format
```

> Observação: o projeto já contém um arquivo de configuração do ESLint (`.eslintrc.js`) compatível com TypeScript e React. Use `lint:fix` e `format` para resolver automaticamente muitos problemas simples.

## Estrutura do projeto

Principais arquivos e pastas:

- `index.html` - entrada HTML do Vite
- `src/` - código-fonte da aplicação
  - `main.tsx` - bootstrap da aplicação
  - `App.tsx` - componente principal de exemplo
  - `assets/` - imagens e ativos
- `public/` - arquivos públicos servidos diretamente
- `vite.config.ts` - configuração do Vite
- `tsconfig.app.json` / `tsconfig.node.json` - configurações TypeScript
- `.eslintrc.js` - regras de lint (TypeScript + React + Prettier)
- `package.json` - scripts e dependências

## Notas sobre ESLint e Prettier

Este projeto foi configurado para usar ESLint com TypeScript e React: a configuração principal está em `.eslintrc.js` e utiliza `@typescript-eslint/parser`, `plugin:@typescript-eslint/recommended`, `plugin:react/recommended`, `plugin:react-hooks/recommended` e `plugin:prettier/recommended`.

Recomendações:

- Instale extensões do editor (por exemplo, VS Code): `ESLint` e `Prettier` para suporte automático.
- Habilite "Format on Save" para aplicar Prettier automaticamente.
