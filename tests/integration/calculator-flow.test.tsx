import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Calculator } from "../../src/components/Calculator";
import "@testing-library/jest-dom";

describe("Calculator Integration Tests", () => {
  it("realiza operaciones complejas manteniendo estado", async () => {
    render(<Calculator />);

    // (2 + 3) * 4 = 20
    fireEvent.click(screen.getByTestId("btn-2"));
    fireEvent.click(screen.getByTestId("btn-add"));
    fireEvent.click(screen.getByTestId("btn-3"));
    fireEvent.click(screen.getByTestId("btn-equals"));

    expect(screen.getByTestId("calculator-display")).toHaveTextContent("5");

    fireEvent.click(screen.getByTestId("btn-multiply"));
    fireEvent.click(screen.getByTestId("btn-4"));
    fireEvent.click(screen.getByTestId("btn-equals"));

    expect(screen.getByTestId("calculator-display")).toHaveTextContent("20");

    // Verificar historial
    fireEvent.click(screen.getByTestId("btn-history"));
    const historyItems = screen.getAllByTestId("history-item");
    expect(historyItems).toHaveLength(2);
  });

  it("maneja flujo completo con errores y recuperación", () => {
    render(<Calculator />);

    // Operación exitosa
    fireEvent.click(screen.getByTestId("btn-1"));
    fireEvent.click(screen.getByTestId("btn-0"));
    fireEvent.click(screen.getByTestId("btn-add"));
    fireEvent.click(screen.getByTestId("btn-5"));
    fireEvent.click(screen.getByTestId("btn-equals"));

    expect(screen.getByTestId("calculator-display")).toHaveTextContent("15");

    // Intentar división por cero
    fireEvent.click(screen.getByTestId("btn-divide"));
    fireEvent.click(screen.getByTestId("btn-0"));
    fireEvent.click(screen.getByTestId("btn-equals"));

    expect(screen.getByTestId("error-display")).toBeInTheDocument();

    // Limpiar y continuar
    fireEvent.click(screen.getByTestId("btn-clear"));
    fireEvent.click(screen.getByTestId("btn-3"));
    fireEvent.click(screen.getByTestId("btn-sqrt"));

    expect(screen.getByTestId("calculator-display")).toHaveTextContent(
      "1.7320508075688772"
    );
  });

  it("historial persiste através de múltiples operaciones", () => {
    render(<Calculator />);

    // Primera operación
    fireEvent.click(screen.getByTestId("btn-2"));
    fireEvent.click(screen.getByTestId("btn-add"));
    fireEvent.click(screen.getByTestId("btn-2"));
    fireEvent.click(screen.getByTestId("btn-equals"));

    // Segunda operación
    fireEvent.click(screen.getByTestId("btn-clear"));
    fireEvent.click(screen.getByTestId("btn-9"));
    fireEvent.click(screen.getByTestId("btn-sqrt"));

    // Tercera operación
    fireEvent.click(screen.getByTestId("btn-power"));
    fireEvent.click(screen.getByTestId("btn-2"));
    fireEvent.click(screen.getByTestId("btn-equals"));

    // Verificar historial completo
    fireEvent.click(screen.getByTestId("btn-history"));
    const historyItems = screen.getAllByTestId("history-item");
    expect(historyItems.length).toBeGreaterThan(0);

    // Limpiar historial
    fireEvent.click(screen.getByTestId("clear-history-btn"));
    expect(
      screen.getByText("No hay operaciones realizadas")
    ).toBeInTheDocument();
  });
});
