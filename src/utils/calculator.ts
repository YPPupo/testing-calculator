import type { CalculationHistory } from "../types/calculator.types";

export class Calculator {
  private history: CalculationHistory[] = [];

  add(a: number, b: number, isPreviewResult?: boolean): number {
    this.validateNumbers(a, b);
    const result = a + b;
    if (!isPreviewResult) this.addToHistory("add", [a, b], result);
    return result;
  }

  subtract(a: number, b: number, isPreviewResult?: boolean): number {
    this.validateNumbers(a, b);
    const result = a - b;
    if (!isPreviewResult) this.addToHistory("subtract", [a, b], result);
    return result;
  }

  multiply(a: number, b: number, isPreviewResult?: boolean): number {
    this.validateNumbers(a, b);
    const result = a * b;
    if (!isPreviewResult) this.addToHistory("multiply", [a, b], result);
    return result;
  }

  divide(a: number, b: number, isPreviewResult?: boolean): number {
    this.validateNumbers(a, b);
    if (b === 0) {
      throw new Error("No se puede dividir por cero");
    }
    const result = a / b;
    if (!isPreviewResult) this.addToHistory("divide", [a, b], result);
    return result;
  }

  power(base: number, exponent: number, isPreviewResult?: boolean): number {
    this.validateNumbers(base, exponent);
    const result = Math.pow(base, exponent);
    if (!isPreviewResult) this.addToHistory("power", [base, exponent], result);
    return result;
  }

  sqrt(n: number, isPreviewResult?: boolean): number {
    this.validateNumbers(n);
    if (n < 0) {
      throw new Error(
        "No se puede calcular la raíz cuadrada de un número negativo"
      );
    }
    const result = Math.sqrt(n);
    if (!isPreviewResult) this.addToHistory("sqrt", [n], result);
    return result;
  }

  private validateNumbers(...numbers: number[]): void {
    numbers.forEach((num) => {
      if (typeof num !== "number" || isNaN(num)) {
        throw new Error("Los argumentos deben ser números válidos");
      }
    });
  }

  private addToHistory(
    operation: string,
    operands: number[],
    result: number
  ): void {
    console.log(
      `Adding to history: ${operation}(${operands.join(", ")}) = ${result}`
    );

    this.history.push({
      id: crypto.randomUUID(),
      operation,
      operands,
      result,
      timestamp: new Date().toISOString(),
    });
  }

  getHistory(): CalculationHistory[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
  }
}
