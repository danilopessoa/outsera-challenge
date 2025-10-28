# Quickstart — Desenvolvimento (Desenvolvedores)

Este guia rápido mostra os passos essenciais para configurar o ambiente e começar o desenvolvimento localmente no projeto "Outsera Challenge".

Pré-requisitos
- Node.js (recomenda-se LTS) e npm
- Git (para clonar/branches)
- Editor (recomenda-se VS Code)

Recomendações de extensões para VS Code
- ESLint
- Prettier
- Tailwind CSS IntelliSense (se usar Tailwind)

1) Clonar o repositório

```bash
git clone <REPO_URL>
cd outsera-challenge
```

2) Instalar dependências

```bash
npm install
```

3) Rodar em modo desenvolvimento

```bash
npm run dev
```

- Acesse a aplicação em: http://localhost:5173 (padrão do Vite)
- O servidor de desenvolvimento recarrega automaticamente ao salvar arquivos.

4) Build para produção

```bash
npm run build
```

- O comando também executa `tsc -b` (build de TypeScript) antes de gerar os assets do Vite.

5) Visualizar o build localmente (preview)

```bash
npm run preview
```

6) Lint (verificação) e correção automática

- Checar problemas com ESLint:

```bash
npm run lint
```

- Tentar corrigir automaticamente problemas suportados:

```bash
npm run lint:fix
```

7) Formatação com Prettier

- Aplicar formatação (modifica arquivos):

```bash
npm run format
```

- Apenas checar formatação (não altera):

```bash
npm run format:check
```

8) Estrutura importante (onde procurar)
- `src/` — código fonte
  - `src/pages/` — páginas (Dashboard, Movies)
  - `src/components/` — componentes reutilizáveis (Card, DataTable, Header, Sidebar, etc.)
  - `src/services/` — chamadas à API (`api.ts`, `movies.service.ts`)
  - `src/interfaces/` — definições de tipos e interfaces
- `vite.config.ts` — configuração do bundler
- `tsconfig.*.json` — configuração TypeScript

9) Dicas rápidas
- Habilite "Format on Save" no VS Code para aplicar Prettier automaticamente.
- Use o ESLint para detectar problemas de qualidade antes de commits.
- Se você estiver trabalhando no Windows e usar WSL, prefira abrir o projeto dentro do WSL para evitar diferenças de permissão/paths.

10) Fluxo sugerido para uma feature
- Criar branch a partir de `main`:

```bash
git checkout -b feat/minha-nova-feature
```

- Implementar, rodar `npm run lint` e `npm run format` localmente.
- Commitar mudanças e abrir Pull Request com descrição clara.

11) Problemas comuns e soluções
- Se algo falhar na instalação (dependências nativas): verifique se `node-gyp`/compilers estão configurados (apenas necessário para alguns pacotes nativos).
- Se o TypeScript reclamar de tipos: verifique `tsconfig.*.json` e as interfaces em `src/interfaces/`.

12) Onde encontrar a API base
- Verifique `src/services/api.ts` para a URL/base e configuração do axios (caso precise ajustar variáveis de ambiente).
