import { describe, it, expect } from "vitest";
import { render, screen } from "../../../tests/test-utils";
import { within } from "@testing-library/react";
import { ProducerWinIntervals } from "./ProducerWinIntervals";

const minMock = [{ producer: "Producer A", interval: 1, previousWin: 2000, followingWin: 2001 }];
const maxMock = [{ producer: "Producer B", interval: 10, previousWin: 1990, followingWin: 2000 }];

describe("ProducerWinIntervals component", () => {
  it("renders card title and both tables titles", () => {
    render(<ProducerWinIntervals min={minMock} max={maxMock} />);

    expect(screen.getByText("Produtores com maior intervalo entre vitórias")).toBeInTheDocument();
    expect(screen.getByText("Máximo")).toBeInTheDocument();
    expect(screen.getByText("Mínimo")).toBeInTheDocument();
  });

  it("renders rows for min and max data", () => {
    render(<ProducerWinIntervals min={minMock} max={maxMock} />);

    // Get the Máximo table and assert its contents
    const maxHeading = screen.getByText("Máximo");
    const maxTable = maxHeading.nextElementSibling as HTMLElement;
    const maxWithin = within(maxTable);

    expect(maxWithin.getByText("Producer B")).toBeInTheDocument();
    expect(maxWithin.getByText("10")).toBeInTheDocument();
    expect(maxWithin.getByText("1990")).toBeInTheDocument();
    expect(maxWithin.getByText("2000")).toBeInTheDocument();

    // Get the Mínimo table and assert its contents
    const minHeading = screen.getByText("Mínimo");
    const minTable = minHeading.nextElementSibling as HTMLElement;
    const minWithin = within(minTable);

    expect(minWithin.getByText("Producer A")).toBeInTheDocument();
    expect(minWithin.getByText("1")).toBeInTheDocument();
    expect(minWithin.getByText("2000")).toBeInTheDocument();
    expect(minWithin.getByText("2001")).toBeInTheDocument();
  });

  it("shows empty state when arrays are empty", () => {
    render(<ProducerWinIntervals min={[]} max={[]} />);

    // The tables should render and show the empty message
    expect(screen.getAllByText("Nenhum dado encontrado.").length).toBeGreaterThanOrEqual(2);
  });
});
