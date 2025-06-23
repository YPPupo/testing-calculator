import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../../../src/components/Button";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  it("renderiza correctamente", () => {
    const mockClick = vi.fn();
    render(<Button onClick={mockClick}>Test</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Test");
  });

  it("llama onClick cuando se hace clic", () => {
    const mockClick = vi.fn();
    render(<Button onClick={mockClick}>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("se deshabilita correctamente", () => {
    const mockClick = vi.fn();
    render(
      <Button onClick={mockClick} disabled>
        Disabled
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(mockClick).not.toHaveBeenCalled();
  });

  it("aplica className personalizado", () => {
    const mockClick = vi.fn();
    render(
      <Button onClick={mockClick} className="custom-class">
        Styled
      </Button>
    );

    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("incluye testId cuando se proporciona", () => {
    const mockClick = vi.fn();
    render(
      <Button onClick={mockClick} testId="test-button">
        Test
      </Button>
    );

    expect(screen.getByTestId("test-button")).toBeInTheDocument();
  });
});
