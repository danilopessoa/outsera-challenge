import { describe, it, expect } from "vitest";
import { render, screen } from "../../../tests/test-utils";
import { YearsWithMultipleWinners } from "./YearsWithMultipleWinners";

const yearsMock = [
  { year: 2000, winnerCount: 3 },
  { year: 1999, winnerCount: 2 },
];

describe("YearsWithMultipleWinners component", () => {
  it("renders card title and table headers", () => {
    render(<YearsWithMultipleWinners years={yearsMock} />);

    expect(screen.getByText("Liste os anos com mais vencedores")).toBeInTheDocument();
    expect(screen.getByText("Ano")).toBeInTheDocument();
    expect(screen.getByText("Contagem de vitórias")).toBeInTheDocument();
  });

  it("renders rows for provided years data", () => {
    render(<YearsWithMultipleWinners years={yearsMock} />);

    // Check that year and count values are rendered
    expect(screen.getByText("2000")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("1999")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("shows empty state when no years", () => {
    render(<YearsWithMultipleWinners years={[]} />);

    expect(screen.getByText("Nenhum dado encontrado.")).toBeInTheDocument();
  });
});
