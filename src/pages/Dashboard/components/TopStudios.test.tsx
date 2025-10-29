import { describe, it, expect } from "vitest";
import { render, screen } from "../../../tests/test-utils";
import { TopStudios } from "./TopStudios";

const studiosMock = [
  { name: "Studio A", winCount: 5 },
  { name: "Studio B", winCount: 3 },
  { name: "Studio C", winCount: 2 },
  { name: "Studio D", winCount: 1 },
];

describe("TopStudios component", () => {
  it("renders card title and table headers", () => {
    render(<TopStudios studios={studiosMock} />);

    expect(screen.getByText("Os 3 melhores estúdios com vencedores")).toBeInTheDocument();
    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Contagem de vitórias")).toBeInTheDocument();
  });

  it("renders only top 3 studios", () => {
    render(<TopStudios studios={studiosMock} />);

    expect(screen.getByText("Studio A")).toBeInTheDocument();
    expect(screen.getByText("Studio B")).toBeInTheDocument();
    expect(screen.getByText("Studio C")).toBeInTheDocument();
    // Studio D should not be rendered because we slice to 3
    expect(screen.queryByText("Studio D")).toBeNull();
  });

  it("shows empty state when no studios", () => {
    render(<TopStudios studios={[]} />);

    expect(screen.getByText("Nenhum dado encontrado.")).toBeInTheDocument();
  });
});
