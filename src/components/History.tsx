import React from "react";
import type { CalculationHistory } from "../types/calculator.types";

interface HistoryProps {
  history: CalculationHistory[];
  onClear: () => void;
  isVisible: boolean;
}

const getOperationSymbol = (operation: string): string => {
  const symbols: Record<string, string> = {
    add: "+",
    subtract: "-",
    multiply: "×",
    divide: "÷",
    power: "^",
    sqrt: "√",
  };
  return symbols[operation] || operation;
};

export const History: React.FC<HistoryProps> = ({
  history,
  onClear,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="bg-gray-50 border-t p-4 max-h-64 overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-700">Historial</h3>
        <button
          onClick={onClear}
          data-testid="clear-history-btn"
          className="text-sm text-red-600 hover:text-red-800"
        >
          Limpiar
        </button>
      </div>

      {history.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay operaciones realizadas</p>
      ) : (
        <div className="space-y-1">
          {history
            .slice(-10)
            .reverse()
            .map((item) => (
              <div
                key={item.id}
                data-testid="history-item"
                className="text-sm font-mono bg-white p-2 rounded border"
              >
                {item.operation === "sqrt"
                  ? `√${item.operands[0]} = ${item.result}`
                  : `${item.operands[0]} ${getOperationSymbol(
                      item.operation
                    )} ${item.operands[1]} = ${item.result}`}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
