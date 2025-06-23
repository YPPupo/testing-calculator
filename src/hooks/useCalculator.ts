import { useState, useCallback } from "react";
import { Calculator } from "../utils/calculator";
import type { CalculatorState, Operation } from "../types/calculator.types";

const calculator = new Calculator();

const initialState: CalculatorState = {
  display: "0",
  previousValue: null,
  operation: null,
  waitingForOperand: false,
  history: [],
  error: null,
  currentExpression: "",
};

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>(initialState);

  const inputNumber = useCallback((num: string) => {
    setState((prev) => {
      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: String(num),
          waitingForOperand: false,
          error: null,
          currentExpression: prev.currentExpression + num,
        };
      }

      return {
        ...prev,
        display: prev.display === "0" ? String(num) : prev.display + num,
        error: null,
        currentExpression:
          prev.display === "0"
            ? prev.currentExpression + num
            : prev.currentExpression + num,
      };
    });
  }, []);

  const inputDecimal = useCallback(() => {
    setState((prev) => {
      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: "0.",
          waitingForOperand: false,
          error: null,
          currentExpression: prev.currentExpression + "0.",
        };
      }

      if (prev.display.indexOf(".") === -1) {
        return {
          ...prev,
          display: prev.display + ".",
          error: null,
          currentExpression: prev.currentExpression + ".",
        };
      }

      return prev;
    });
  }, []);

  const performOperation = useCallback((nextOperation: Operation) => {
    setState((prev) => {
      const inputValue = parseFloat(prev.display);

      const opSymbol: Record<Operation, string> = {
        add: " + ",
        subtract: " - ",
        multiply: " × ",
        divide: " ÷ ",
        power: " ^ ",
        sqrt: " √ ",
        clear: "",
      };

      if (prev.previousValue === null) {
        return {
          ...prev,
          previousValue: inputValue,
          operation: nextOperation,
          waitingForOperand: true,
          error: null,
          currentExpression: prev.display + opSymbol[nextOperation],
        };
      }

      if (prev.operation && prev.waitingForOperand) {
        return {
          ...prev,
          operation: nextOperation,
          error: null,
          currentExpression:
            prev.currentExpression.slice(0, -3) + opSymbol[nextOperation],
        };
      }

      if (prev.previousValue !== null && prev.operation) {
        try {
          let result: number;

          switch (prev.operation) {
            case "add":
              result = calculator.add(prev.previousValue, inputValue);
              break;
            case "subtract":
              result = calculator.subtract(prev.previousValue, inputValue);
              break;
            case "multiply":
              result = calculator.multiply(prev.previousValue, inputValue);
              break;
            case "divide":
              result = calculator.divide(prev.previousValue, inputValue);
              break;
            case "power":
              result = calculator.power(prev.previousValue, inputValue);
              break;
            default:
              return prev;
          }

          return {
            ...prev,
            display: String(result),
            previousValue: result,
            operation: nextOperation,
            waitingForOperand: true,
            history: calculator.getHistory(),
            error: null,
            currentExpression: String(result) + opSymbol[nextOperation],
          };
        } catch (error) {
          return {
            ...prev,
            error: error instanceof Error ? error.message : "Error desconocido",
            operation: null,
            previousValue: null,
            waitingForOperand: true,
            currentExpression: "",
          };
        }
      }

      return prev;
    });
  }, []);

  const calculate = useCallback(() => {
    setState((prev) => {
      const inputValue = parseFloat(prev.display);

      if (prev.previousValue !== null && prev.operation) {
        try {
          let result: number;

          switch (prev.operation) {
            case "add":
              result = calculator.add(prev.previousValue, inputValue);
              break;
            case "subtract":
              result = calculator.subtract(prev.previousValue, inputValue);
              break;
            case "multiply":
              result = calculator.multiply(prev.previousValue, inputValue);
              break;
            case "divide":
              result = calculator.divide(prev.previousValue, inputValue);
              break;
            case "power":
              result = calculator.power(prev.previousValue, inputValue);
              break;
            default:
              return prev;
          }

          return {
            ...prev,
            display: String(result),
            previousValue: null,
            operation: null,
            waitingForOperand: true,
            history: calculator.getHistory(),
            error: null,
            currentExpression: "",
          };
        } catch (error) {
          return {
            ...prev,
            error: error instanceof Error ? error.message : "Error desconocido",
            operation: null,
            previousValue: null,
            waitingForOperand: true,
            currentExpression: "",
          };
        }
      }

      return prev;
    });
  }, []);

  let partialResult: string | null = null;
  if (
    state.previousValue !== null &&
    state.operation &&
    !state.waitingForOperand &&
    !state.error
  ) {
    try {
      const inputValue = parseFloat(state.display);
      let result: number | null = null;
      switch (state.operation) {
        case "add":
          result = calculator.add(state.previousValue, inputValue);
          break;
        case "subtract":
          result = calculator.subtract(state.previousValue, inputValue);
          break;
        case "multiply":
          result = calculator.multiply(state.previousValue, inputValue);
          break;
        case "divide":
          result = calculator.divide(state.previousValue, inputValue);
          break;
        case "power":
          result = calculator.power(state.previousValue, inputValue);
          break;
      }
      if (result !== null) partialResult = String(result);
    } catch {
      partialResult = null;
    }
  }

  const performSqrt = useCallback(() => {
    setState((prev) => {
      const inputValue = parseFloat(prev.display);

      try {
        const result = calculator.sqrt(inputValue);
        return {
          ...prev,
          display: String(result),
          history: calculator.getHistory(),
          error: null,
        };
      } catch (error) {
        return {
          ...prev,
          error: error instanceof Error ? error.message : "Error desconocido",
        };
      }
    });
  }, []);

  const clear = useCallback(() => {
    setState(initialState);
  }, []);

  const clearHistory = useCallback(() => {
    calculator.clearHistory();
    setState((prev) => ({
      ...prev,
      history: [],
    }));
  }, []);

  return {
    state,
    inputNumber,
    inputDecimal,
    performOperation,
    calculate,
    performSqrt,
    clear,
    clearHistory,
    partialResult,
  };
};
