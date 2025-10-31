# 🎯 Coverage Setup - Configuração Completa

## ✅ O que foi Configurado

### 1. **Pacotes Instalados**

```json
{
  "@vitest/coverage-v8": "^1.x.x"
}
```

### 2. **Configuração do Vitest** (`vite.config.ts`)

    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/",
        "src/tests/",
        "**/*.config.{js,ts}",
        "**/*.d.ts",
        "**/vite-env.d.ts",
        "src/main.tsx",
        "src/App.tsx",
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
        "src/tests/test-utils.tsx",
        "src/tests/setup.ts",
        "src/tests/mocks/**",
      ],
      include: ["src/**/*.{ts,tsx}"],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    }

### 3. **Scripts Adicionados** (`package.json`)

```json
{
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage"
}
```

### 4. **GitIgnore Atualizado**

```gitignore
# Test coverage
coverage
```

### 5. **Documentação Criada**

- ✅ **COVERAGE.md** - Relatório detalhado de cobertura
- ✅ **README.md** - Atualizado com seção de testes e badges
- ✅ **COVERAGE_SETUP.md** - Este arquivo (guia de configuração)

## 📊 Resultados Atuais

### Cobertura Geral

```
Statements   : 82.09%
Branches     : 77.34%
Functions    : 80.6%
Lines        : 83.7%
```

### Componentes com 100% de Cobertura

- ✅ Card
- ✅ Header
- ✅ Sidebar
- ✅ Skeleton
- ✅ Dashboard (página)
- ✅ useDashboard (hook)
- ✅ services/movies
- ✅ template

### Testes

- **Total:** 73 testes
- **Passando:** 73 ✅
- **Falhando:** 0 ❌

## 🚀 Como Usar

### Executar testes com coverage

```bash
npm run test:coverage
```

### Visualizar relatório HTML

```bash
# Windows (WSL)
explorer.exe coverage/index.html

# Linux
xdg-open coverage/index.html

# macOS
open coverage/index.html
```

### Executar testes em modo watch

```bash
npm test
```

### Executar testes com UI

```bash
npm run test:ui
```

## 📁 Estrutura de Arquivos de Coverage

```
coverage/
├── index.html              # Relatório HTML navegável
├── coverage-final.json     # Dados JSON brutos
├── lcov.info              # Formato LCOV (para CI/CD)
└── lcov-report/           # Relatórios LCOV detalhados
```

## 🎯 Metas de Cobertura

O projeto está configurado com as seguintes metas:

| Métrica    | Méta | Atual  | Status |
| ---------- | ---- | ------ | ------ |
| Statements | 80%  | 82.09% | ✅     |
| Branches   | 80%  | 77.34% | 🟡     |
| Functions  | 80%  | 80.6%  | ✅     |
| Lines      | 80%  | 83.7%  | ✅     |

## 📈 Próximas Melhorias

### Prioridade Alta

1. **DataTable** (53.44% → 80%)
   - Adicionar testes de paginação
   - Testar filtros
   - Testar ordenação

2. **Interfaces** (0% → 80%)
   - Cobrir arquivos de interfaces utilizados por componentes/serviços

### Prioridade Média

3. **Dashboard Components** (alguns com cobertura baixa nos subcomponentes)
   - ProducerWinIntervals
   - TopStudios
   - WinnersByYear
   - YearsWithMultipleWinners

4. **Template** (manter testes de layout)

## 🔧 Comandos Úteis

```bash
# Gerar coverage e ver resumo
npm run test:coverage

# Apenas testes (sem coverage)
npm run test:run

# Modo watch (desenvolvimento)
npm test

# UI interativa
npm run test:ui

# Limpar cache de testes
npx vitest run --clearCache

# Executar testes de um arquivo específico
npm test -- Card.test.tsx

# Ver coverage de um componente específico
npm run test:coverage -- Card.test.tsx
```

## 🎨 Tipos de Relatórios

### 1. Text (Console)

Exibido automaticamente no terminal após `npm run test:coverage`

### 2. HTML (Navegável)

- Acesse `coverage/index.html`
- Navegue por arquivos e linhas
- Veja código coberto/não coberto

### 3. JSON

- `coverage/coverage-final.json`
- Para integração com ferramentas

### 4. LCOV

- `coverage/lcov.info`
- Para integração CI/CD (GitHub Actions, GitLab CI, etc.)

## 🔍 Entendendo os Relatórios

### Statements (Declarações)

Quantas declarações do código foram executadas

### Branches (Ramificações)

Quantos caminhos de `if/else`, `switch`, etc. foram testados

### Functions (Funções)

Quantas funções foram chamadas

### Lines (Linhas)

Quantas linhas de código foram executadas

## 🎓 Boas Práticas

1. **Execute coverage regularmente**

   ```bash
   npm run test:coverage
   ```

2. **Analise o relatório HTML**
   - Identifique código não testado
   - Priorize áreas críticas

3. **Mantenha metas realistas**
   - 80% é uma meta sólida
   - 100% nem sempre é necessário

4. **Exclua arquivos irrelevantes**
   - Configurações
   - Mocks
   - Entry points

5. **Teste comportamento, não implementação**
   - Foque em casos de uso
   - Teste edge cases

## 📝 Integração CI/CD

Para integrar com GitHub Actions, adicione:

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

## ✅ Checklist de Configuração

- [x] Instalado `@vitest/coverage-v8`
- [x] Configurado `vite.config.ts`
- [x] Adicionados scripts no `package.json`
- [x] Atualizado `.gitignore`
- [x] Criada documentação (COVERAGE.md)
- [x] Atualizado README.md
- [x] Testes rodando com sucesso
- [x] Coverage funcionando
- [ ] Integração CI/CD (opcional)
- [ ] Badge de coverage atualizado automaticamente (opcional)

## 🎉 Conclusão

A configuração de coverage está completa e funcionando!

- ✅ 73 testes passando
- ✅ Coverage em 83.7%
- ✅ Relatórios em múltiplos formatos
- ✅ Documentação completa

**Próximo passo:** Aumentar a cobertura para atingir a meta de 80%!

---

**Data de configuração:** 2025-10-29
**Versão do Vitest:** 4.0.4
**Versão do Coverage:** @vitest/coverage-v8
