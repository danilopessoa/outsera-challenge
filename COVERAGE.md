# 📊 Coverage Report

## Visão Geral

Este projeto utiliza **Vitest** com **v8** para geração de relatórios de cobertura de código.

### Comandos Disponíveis

```bash
# Executar testes com coverage
npm run test:coverage

# Executar testes em modo watch
npm test

# Executar testes uma única vez
npm run test:run

# Executar testes com UI
npm run test:ui
```

## 📈 Métricas de Cobertura

### Última Execução

```
File               | % Stmts | % Branch | % Funcs | % Lines
-------------------|---------|----------|---------|--------
All files          |   81.18 |    78.12 |   79.1  |   82.7
```

### Cobertura por Módulo

#### ✅ 100% de Cobertura

- **components/Card** - 100%
- **components/Header** - 100%
- **components/Sidebar** - 100%
- **components/Skeleton** - 100%
- **pages/Dashboard** - 100%
- **services/movies** - 100%
- **template** - 100%

#### 🟡 Boa Cobertura (> 70%)

- **pages/Movies** - 82.6%
- **components/DataTable/FilterFields** - 77.77%
- **components/DataTable/Pagination** - 75%
- **services/api** - 100% (statements)

#### 🔴 Necessita Melhorias

- **components/DataTable/DataTable** - 53.44%
- **interfaces** - 0%

## 🎯 Metas de Cobertura

O projeto está configurado com as seguintes metas mínimas no `vite.config.ts`:

```text
coverage:
  lines: 80
  functions: 80
  branches: 80
  statements: 80
```

## 📁 Arquivos Excluídos

Os seguintes arquivos/diretórios são excluídos da análise de coverage:

- `node_modules/`
- `src/tests/` - Utilitários de teste
- `**/*.config.{js,ts}` - Arquivos de configuração
- `**/*.d.ts` - Arquivos de definição TypeScript
- `**/vite-env.d.ts`
- `src/main.tsx` - Entry point
- `src/App.tsx` - App root
- `**/*.test.{ts,tsx}` - Arquivos de teste
- `**/*.spec.{ts,tsx}` - Arquivos de especificação
- `src/tests/test-utils.tsx`
- `src/tests/setup.ts`
- `src/tests/mocks/**`

## 📊 Relatórios Gerados

Ao executar `npm run test:coverage`, os seguintes relatórios são gerados:

1. **Terminal (text)** - Exibido no console
2. **JSON** - `coverage/coverage-final.json`
3. **HTML** - `coverage/index.html` (navegável no browser)
4. **LCOV** - `coverage/lcov.info` (para integração com ferramentas CI/CD)

### Visualizando o Relatório HTML

```bash
# Abrir o relatório no navegador padrão
open coverage/index.html  # macOS
xdg-open coverage/index.html  # Linux
start coverage/index.html  # Windows
```

## 🧪 Suítes de Testes

### Componentes (73 testes)

- ✅ Card (4 testes)
- ✅ DataTable (4 testes)
- ✅ FilterFields (10 testes)
- ✅ Header (4 testes)
- ✅ Sidebar (11 testes)
- ✅ Skeleton (4 testes)

### Páginas (32 testes)

- ✅ Dashboard (13 testes)
- ✅ Dashboard Hook (10 testes)
- ✅ Movies (9 testes)

### Hooks

- ✅ useMovies (4 testes)
- ✅ useDashboard (10 testes)
