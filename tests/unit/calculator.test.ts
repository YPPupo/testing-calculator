import { describe, it, expect, beforeEach } from "vitest";
import { Calculator } from "../../src/utils/calculator";

describe("Calculator", () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe("Operaciones básicas", () => {
    it("suma dos números correctamente", () => {
      expect(calculator.add(2, 3)).toBe(5);
      expect(calculator.add(-1, 1)).toBe(0);
      expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    it("resta dos números correctamente", () => {
      expect(calculator.subtract(5, 3)).toBe(2);
      expect(calculator.subtract(-1, -1)).toBe(0);
      expect(calculator.subtract(0, 5)).toBe(-5);
    });

    it("multiplica dos números correctamente", () => {
      expect(calculator.multiply(3, 4)).toBe(12);
      expect(calculator.multiply(-2, 3)).toBe(-6);
      expect(calculator.multiply(0, 5)).toBe(0);
    });

    it("divide dos números correctamente", () => {
      expect(calculator.divide(10, 2)).toBe(5);
      expect(calculator.divide(-6, 3)).toBe(-2);
      expect(calculator.divide(7, 2)).toBe(3.5);
    });
  });

  describe("Operaciones avanzadas", () => {
    it("calcula potencias correctamente", () => {
      expect(calculator.power(2, 3)).toBe(8);
      expect(calculator.power(5, 0)).toBe(1);
      expect(calculator.power(-2, 2)).toBe(4);
    });

    it("calcula raíz cuadrada correctamente", () => {
      expect(calculator.sqrt(9)).toBe(3);
      expect(calculator.sqrt(0)).toBe(0);
      expect(calculator.sqrt(2)).toBeCloseTo(1.414, 2);
    });
  });

  describe("Manejo de errores", () => {
    it("lanza error al dividir por cero", () => {
      expect(() => calculator.divide(5, 0)).toThrow(
        "No se puede dividir por cero"
      );
    });

    it("lanza error con raíz cuadrada de número negativo", () => {
      expect(() => calculator.sqrt(-4)).toThrow(
        "No se puede calcular la raíz cuadrada de un número negativo"
      );
    });

    it("lanza error con argumentos no numéricos", () => {
      expect(() => calculator.add(NaN, 2)).toThrow(
        "Los argumentos deben ser números válidos"
      );
    });
  });

  describe("Historial", () => {
    it("guarda operaciones en el historial", () => {
      calculator.add(2, 3);
      calculator.multiply(4, 5);

      const history = calculator.getHistory();
      expect(history).toHaveLength(2);
      expect(history[0].operation).toBe("add");
      expect(history[0].result).toBe(5);
      expect(history[1].operation).toBe("multiply");
      expect(history[1].result).toBe(20);
    });

    it("limpia el historial correctamente", () => {
      calculator.add(1, 2);
      calculator.clearHistory();
      expect(calculator.getHistory()).toHaveLength(0);
    });
  });
});
