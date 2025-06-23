import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCalculator } from "../../src/hooks/useCalculator";

describe("useCalculator Hook", () => {
  it("inicializa con estado correcto", () => {
    const { result } = renderHook(() => useCalculator());

    expect(result.current.state.display).toBe("0");
    expect(result.current.state.previousValue).toBeNull();
    expect(result.current.state.operation).toBeNull();
    expect(result.current.state.waitingForOperand).toBe(false);
    expect(result.current.state.error).toBeNull();
  });

  it("maneja entrada de números correctamente", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.inputNumber("5");
    });

    expect(result.current.state.display).toBe("5");

    act(() => {
      result.current.inputNumber("3");
    });

    expect(result.current.state.display).toBe("53");
  });

  it("maneja decimales correctamente", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.inputNumber("3");
      result.current.inputDecimal();
      result.current.inputNumber("14");
    });

    expect(result.current.state.display).toBe("3.14");
  });

  it("previene múltiples puntos decimales", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.inputNumber("3");
      result.current.inputDecimal();
      result.current.inputNumber("1");
      result.current.inputDecimal(); // Este no debería agregarse
      result.current.inputNumber("4");
    });

    expect(result.current.state.display).toBe("3.14");
  });

  it("realiza operaciones correctamente", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.inputNumber("5");
      result.current.performOperation("add");
      result.current.inputNumber("3");
      result.current.calculate();
    });

    expect(result.current.state.display).toBe("8");
  });

  it("maneja errores correctamente", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.inputNumber("5");
      result.current.performOperation("divide");
      result.current.inputNumber("0");
      result.current.calculate();
    });

    expect(result.current.state.error).toBe("No se puede dividir por cero");
  });

  it("limpia estado correctamente", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.inputNumber("5");
      result.current.performOperation("add");
      result.current.inputNumber("3");
      result.current.clear();
    });

    expect(result.current.state.display).toBe("0");
    expect(result.current.state.previousValue).toBeNull();
    expect(result.current.state.operation).toBeNull();
  });

  it("calcula resultado parcial mientras se escribe", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.inputNumber("2");
      result.current.performOperation("add");
      result.current.inputNumber("3");
    });

    expect(result.current.partialResult).toBe("5");
    expect(result.current.state.display).toBe("3"); // El display real sigue siendo el número ingresado
  });
});
