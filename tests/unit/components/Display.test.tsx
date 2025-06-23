import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Display } from "../../../src/components/Display";
import "@testing-library/jest-dom";

describe("Display Component", () => {
  it("muestra el valor correctamente", () => {
    render(<Display value="123.45" error={null} />);
    expect(screen.getByTestId("calculator-display")).toHaveTextContent(
      "123.45"
    );
  });

  it("muestra errores cuando están presentes", () => {
    render(<Display value="Error" error="División por cero" />);
    expect(screen.getByTestId("error-display")).toHaveTextContent(
      "División por cero"
    );
  });

  it("no muestra error cuando es null", () => {
    render(<Display value="42" error={null} />);
    expect(screen.queryByTestId("error-display")).not.toBeInTheDocument();
  });

  it("muestra la expresión si se proporciona", () => {
    render(<Display value="5" error={null} expression="2 + 3" />);
    expect(screen.getByText("2 + 3")).toBeInTheDocument();
  });
});
