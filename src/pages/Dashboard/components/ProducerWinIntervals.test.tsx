import { describe, it, expect } from "vitest";
import { render, screen } from "../../../tests/test-utils";
import { within } from "@testing-library/react";
import { ProducerWinIntervals } from "./ProducerWinIntervals";

const minMock = [{ producer: "Producer A", interval: 1, previousWin: 2000, followingWin: 2001 }];
const maxMock = [{ producer: "Producer B", interval: 10, previousWin: 1990, followingWin: 2000 }];

describe("ProducerWinIntervals component", () => {
  it("renders card title and both tables titles", () => {
    render(<ProducerWinIntervals min={minMock} max={maxMock} />);

    expect(screen.getByText("Producers with longest and shortest interval between wins")).toBeInTheDocument();
    expect(screen.getByText("Maximum")).toBeInTheDocument();
    expect(screen.getByText("Minimum")).toBeInTheDocument();
  });

  it("renders rows for min and max data", () => {
    render(<ProducerWinIntervals min={minMock} max={maxMock} />);

    const maxHeading = screen.getByText("Maximum");
    const maxTable = maxHeading.nextElementSibling as HTMLElement;
    const maxWithin = within(maxTable);

    expect(maxWithin.getByText("Producer B")).toBeInTheDocument();
    expect(maxWithin.getByText("10")).toBeInTheDocument();
    expect(maxWithin.getByText("1990")).toBeInTheDocument();
    expect(maxWithin.getByText("2000")).toBeInTheDocument();

    const minHeading = screen.getByText("Minimum");
    const minTable = minHeading.nextElementSibling as HTMLElement;
    const minWithin = within(minTable);

    expect(minWithin.getByText("Producer A")).toBeInTheDocument();
    expect(minWithin.getByText("1")).toBeInTheDocument();
    expect(minWithin.getByText("2000")).toBeInTheDocument();
    expect(minWithin.getByText("2001")).toBeInTheDocument();
  });

  it("shows empty state when arrays are empty", () => {
    render(<ProducerWinIntervals min={[]} max={[]} />);

    expect(screen.getAllByText("No data found.").length).toBeGreaterThanOrEqual(2);
  });
});
