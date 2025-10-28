# Guia de Testes - Outsera Challenge

## 📋 Configuração Completa

O ambiente de testes está configurado com as seguintes ferramentas:

- **Vitest**: Framework de testes rápido e moderno para Vite
- **React Testing Library**: Biblioteca para testar componentes React
- **jsdom**: Ambiente DOM para testes
- **@testing-library/jest-dom**: Matchers customizados para testes DOM
- **@testing-library/user-event**: Simular interações do usuário

## 🚀 Scripts Disponíveis

```bash
# Executar testes em modo watch (desenvolvimento)
npm test

# Executar testes com interface gráfica
npm run test:ui

# Executar testes uma única vez (para CI/CD)
npm run test:run

# Executar testes com cobertura de código
npm run test:coverage
```

## 📁 Estrutura de Arquivos de Teste

```
src/
├── tests/
│   ├── setup.ts                 # Configuração global dos testes
│   ├── test-utils.tsx           # Utilidades e render customizado
│   └── mocks/
│       └── api.mock.ts          # Mocks de API e dados
├── components/
│   └── Card/
│       ├── Card.tsx
│       └── Card.test.tsx        # Testes do componente Card
```

## ✍️ Escrevendo Testes

### Exemplo Básico de Teste de Componente

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "src/tests/test-utils";
import { MeuComponente } from "./MeuComponente";

describe("MeuComponente", () => {
  it("should render correctly", () => {
    render(<MeuComponente />);
    expect(screen.getByText("Texto esperado")).toBeInTheDocument();
  });
});
```

### Testando Interações do Usuário

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "src/tests/test-utils";
import userEvent from "@testing-library/user-event";
import { MeuFormulario } from "./MeuFormulario";

describe("MeuFormulario", () => {
  it("should handle user input", async () => {
    const user = userEvent.setup();
    render(<MeuFormulario />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Texto de teste");

    expect(input).toHaveValue("Texto de teste");
  });
});
```

### Testando com Mocks de API

```typescript
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "src/tests/test-utils";
import { mockMovies } from "src/tests/mocks/api.mock";
import * as moviesService from "src/services/movies/movies.service";

describe("MoviesComponent", () => {
  it("should fetch and display movies", async () => {
    // Mock da função de serviço
    vi.spyOn(moviesService, "getMovies").mockResolvedValue(mockMovies);

    render(<MoviesComponent />);

    await waitFor(() => {
      expect(screen.getByText("Can't Stop the Music")).toBeInTheDocument();
    });
  });
});
```

### Testando Hooks Customizados

```typescript
import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDashboard } from "./useDashboard";

describe("useDashboard", () => {
  it("should fetch dashboard data", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useDashboard(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
});
```

## 🎯 Boas Práticas

### 1. Use o render customizado

Sempre importe `render` de `src/tests/test-utils` para ter os providers necessários (QueryClient, Router, etc.)

```typescript
import { render, screen } from "src/tests/test-utils";
```

### 2. Queries Recomendadas (em ordem de preferência)

- `getByRole`: Mais acessível e semântico
- `getByLabelText`: Para inputs de formulário
- `getByPlaceholderText`: Para inputs sem label
- `getByText`: Para texto visível
- `getByTestId`: Último recurso

### 3. Async Testing

Use `waitFor` para esperar por mudanças assíncronas:

```typescript
await waitFor(() => {
  expect(screen.getByText("Carregado")).toBeInTheDocument();
});
```

### 4. Limpeza

O cleanup é feito automaticamente após cada teste (configurado em `setup.ts`)

### 5. Mocking

- Use `vi.fn()` para criar mocks
- Use `vi.spyOn()` para espionar funções existentes
- Limpe os mocks com `vi.clearAllMocks()` quando necessário

## 📊 Cobertura de Código

Após executar `npm run test:coverage`, você encontrará o relatório em:

- Terminal: Resumo em texto
- `coverage/index.html`: Relatório HTML detalhado

Objetivo de cobertura recomendado:

- Statements: > 80%
- Branches: > 75%
- Functions: > 80%
- Lines: > 80%

## 🔍 Debugging

### Modo Debug no VS Code

1. Adicione um breakpoint no seu teste
2. Execute o teste em modo debug

### Ver o DOM durante o teste

```typescript
import { screen } from "@testing-library/react";

// No seu teste
screen.debug(); // Mostra todo o DOM
screen.debug(elemento); // Mostra elemento específico
```

## 📚 Recursos Adicionais

- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 🎨 Exemplo Completo

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "src/tests/test-utils";
import userEvent from "@testing-library/user-event";
import { MeuComponente } from "./MeuComponente";

describe("MeuComponente", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render initial state", () => {
    render(<MeuComponente />);
    expect(screen.getByRole("heading")).toHaveTextContent("Título");
  });

  it("should handle click event", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<MeuComponente onClick={handleClick} />);

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should display loading state", async () => {
    render(<MeuComponente isLoading />);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });
});
```
