import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Calculator } from "../../../src/components/Calculator";
import "@testing-library/jest-dom";

describe("Calculator Component", () => {
  it("renderiza correctamente", () => {
    render(<Calculator />);
    expect(screen.getByTestId("calculator-display")).toBeInTheDocument();
    expect(screen.getByTestId("btn-0")).toBeInTheDocument();
  });

  it("muestra números cuando se hace clic", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByTestId("btn-2"));
    fireEvent.click(screen.getByTestId("btn-3"));

    expect(screen.getByTestId("calculator-display")).toHaveTextContent("23");
  });

  it("muestra resultado parcial al escribir una operación", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("btn-2"));
    fireEvent.click(screen.getByTestId("btn-add"));
    fireEvent.click(screen.getByTestId("btn-3"));
    // El display debe mostrar el resultado parcial (5)
    expect(screen.getByTestId("calculator-display")).toHaveTextContent("5");
  });

  it("realiza operaciones básicas", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByTestId("btn-2"));
    fireEvent.click(screen.getByTestId("btn-add"));
    fireEvent.click(screen.getByTestId("btn-3"));
    fireEvent.click(screen.getByTestId("btn-equals"));

    expect(screen.getByTestId("calculator-display")).toHaveTextContent("5");
  });

  it("muestra errores correctamente", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByTestId("btn-5"));
    fireEvent.click(screen.getByTestId("btn-divide"));
    fireEvent.click(screen.getByTestId("btn-0"));
    fireEvent.click(screen.getByTestId("btn-equals"));

    expect(screen.getByTestId("error-display")).toBeInTheDocument();
  });

  it("muestra y oculta historial", () => {
    render(<Calculator />);

    // Realizar una operación
    fireEvent.click(screen.getByTestId("btn-2"));
    fireEvent.click(screen.getByTestId("btn-add"));
    fireEvent.click(screen.getByTestId("btn-3"));
    fireEvent.click(screen.getByTestId("btn-equals"));

    // Mostrar historial
    fireEvent.click(screen.getByTestId("btn-history"));
    expect(screen.getByText("Historial")).toBeInTheDocument();

    // Ocultar historial
    fireEvent.click(screen.getByTestId("btn-history"));
    expect(screen.queryByText("Historial")).not.toBeInTheDocument();
  });
});
