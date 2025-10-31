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

    expect(screen.getByText("Top 3 studios with winners")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Win Count")).toBeInTheDocument();
  });

  it("renders only top 3 studios", () => {
    render(<TopStudios studios={studiosMock} />);

    expect(screen.getByText("Studio A")).toBeInTheDocument();
    expect(screen.getByText("Studio B")).toBeInTheDocument();
    expect(screen.getByText("Studio C")).toBeInTheDocument();
    expect(screen.queryByText("Studio D")).toBeNull();
  });

  it("shows empty state when no studios", () => {
    render(<TopStudios studios={[]} />);

    expect(screen.getByText("No data found.")).toBeInTheDocument();
  });
});
