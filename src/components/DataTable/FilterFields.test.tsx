import { describe, it, vi, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { FilterField } from "./FilterFields";
import { render, screen } from "@testing-library/react";

describe("FilterField", () => {
  const mockOnChange = vi.fn();
  const mockOnClear = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("text field", () => {
    it("renders text input with correct placeholder", () => {
      render(<FilterField id="test-field" placeholder="Search..." onChange={mockOnChange} onClear={mockOnClear} />);

      const input = screen.getByPlaceholderText("Search...");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
    });

    it("calls onChange when user types", async () => {
      const user = userEvent.setup();
      render(<FilterField id="test-field" placeholder="Search..." onChange={mockOnChange} onClear={mockOnClear} />);

      const input = screen.getByPlaceholderText("Search...");
      await user.type(input, "test");

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange.mock.calls.length).toBeGreaterThan(0);
    });

    it("shows clear button when value is present", () => {
      render(
        <FilterField
          id="test-field"
          value="test"
          placeholder="Search..."
          onChange={mockOnChange}
          onClear={mockOnClear}
        />,
      );

      const clearButton = screen.getByTitle("Limpar");
      expect(clearButton).toBeInTheDocument();
    });

    it("calls onClear when clear button is clicked", async () => {
      const user = userEvent.setup();
      render(
        <FilterField
          id="test-field"
          value="test"
          placeholder="Search..."
          onChange={mockOnChange}
          onClear={mockOnClear}
        />,
      );

      const clearButton = screen.getByTitle("Limpar");
      await user.click(clearButton);

      expect(mockOnClear).toHaveBeenCalledTimes(1);
    });

    it("does not show clear button when value is empty", () => {
      render(
        <FilterField id="test-field" value="" placeholder="Search..." onChange={mockOnChange} onClear={mockOnClear} />,
      );

      const clearButton = screen.queryByTitle("Limpar");
      expect(clearButton).not.toBeInTheDocument();
    });
  });

  describe("select field", () => {
    it("renders select with correct options", () => {
      render(<FilterField id="test-select" fieldType="select" onChange={mockOnChange} onClear={mockOnClear} />);

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();

      expect(screen.getByText("Escolha uma opção")).toBeInTheDocument();
      expect(screen.getByText("Yes")).toBeInTheDocument();
      expect(screen.getByText("No")).toBeInTheDocument();
    });

    it("calls onChange when option is selected", async () => {
      const user = userEvent.setup();
      render(<FilterField id="test-select" fieldType="select" onChange={mockOnChange} onClear={mockOnClear} />);

      const select = screen.getByRole("combobox");
      await user.selectOptions(select, "yes");

      expect(mockOnChange).toHaveBeenCalledWith("yes");
    });
  });

  describe("number field", () => {
    it("renders number input with correct attributes", () => {
      render(<FilterField id="test-number" fieldType="number" onChange={mockOnChange} onClear={mockOnClear} />);

      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("inputMode", "numeric");
      expect(input).toHaveAttribute("type", "text");
    });

    it("shows clear button when value is present", () => {
      render(
        <FilterField id="test-number" fieldType="number" value="2024" onChange={mockOnChange} onClear={mockOnClear} />,
      );

      const clearButton = screen.getByTitle("Limpar");
      expect(clearButton).toBeInTheDocument();
    });

    it("calls onClear when clear button is clicked", async () => {
      const user = userEvent.setup();
      render(
        <FilterField id="test-number" fieldType="number" value="2024" onChange={mockOnChange} onClear={mockOnClear} />,
      );

      const clearButton = screen.getByTitle("Limpar");
      await user.click(clearButton);

      expect(mockOnClear).toHaveBeenCalledTimes(1);
    });
  });
});
