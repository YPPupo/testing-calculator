import React, { useState } from "react";
import { useCalculator } from "../hooks/useCalculator";
import { Button } from "./Button";
import { Display } from "./Display";
import { History } from "./History";

export const Calculator: React.FC = () => {
  const {
    state,
    inputNumber,
    inputDecimal,
    performOperation,
    calculate,
    performSqrt,
    clear,
    clearHistory,
    partialResult,
  } = useCalculator();

  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <Display
        value={partialResult ?? state.display}
        error={state.error}
        expression={state.currentExpression}
      />

      <div className="p-4">
        <div className="grid grid-cols-4 gap-2 mb-4">
          {/* Primera fila */}
          <Button
            onClick={clear}
            className="bg-red-500 text-white hover:bg-red-600"
            testId="btn-clear"
          >
            AC
          </Button>
          <Button
            onClick={performSqrt}
            className="bg-blue-500 text-white hover:bg-blue-600"
            testId="btn-sqrt"
          >
            √
          </Button>
          <Button
            onClick={() => performOperation("power")}
            className="bg-blue-500 text-white hover:bg-blue-600"
            testId="btn-power"
          >
            x^y
          </Button>
          <Button
            onClick={() => performOperation("divide")}
            className="bg-orange-500 text-white hover:bg-orange-600"
            testId="btn-divide"
          >
            ÷
          </Button>

          {/* Segunda fila */}
          <Button onClick={() => inputNumber("7")} testId="btn-7">
            7
          </Button>
          <Button onClick={() => inputNumber("8")} testId="btn-8">
            8
          </Button>
          <Button onClick={() => inputNumber("9")} testId="btn-9">
            9
          </Button>
          <Button
            onClick={() => performOperation("multiply")}
            className="bg-orange-500 text-white hover:bg-orange-600"
            testId="btn-multiply"
          >
            ×
          </Button>

          {/* Tercera fila */}
          <Button onClick={() => inputNumber("4")} testId="btn-4">
            4
          </Button>
          <Button onClick={() => inputNumber("5")} testId="btn-5">
            5
          </Button>
          <Button onClick={() => inputNumber("6")} testId="btn-6">
            6
          </Button>
          <Button
            onClick={() => performOperation("subtract")}
            className="bg-orange-500 text-white hover:bg-orange-600"
            testId="btn-subtract"
          >
            -
          </Button>

          {/* Cuarta fila */}
          <Button onClick={() => inputNumber("1")} testId="btn-1">
            1
          </Button>
          <Button onClick={() => inputNumber("2")} testId="btn-2">
            2
          </Button>
          <Button onClick={() => inputNumber("3")} testId="btn-3">
            3
          </Button>
          <Button
            onClick={() => performOperation("add")}
            className="bg-orange-500 text-white hover:bg-orange-600"
            testId="btn-add"
          >
            +
          </Button>

          {/* Quinta fila */}
          <Button
            onClick={() => inputNumber("0")}
            className="col-span-2"
            testId="btn-0"
          >
            0
          </Button>
          <Button onClick={inputDecimal} testId="btn-decimal">
            .
          </Button>
          <Button
            onClick={calculate}
            className="bg-orange-500 text-white hover:bg-orange-600"
            testId="btn-equals"
          >
            =
          </Button>
        </div>

        <Button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full bg-gray-600 text-white hover:bg-gray-700"
          testId="btn-history"
        >
          {showHistory ? "Ocultar" : "Mostrar"} Historial
        </Button>
      </div>

      <History
        history={state.history}
        onClear={clearHistory}
        isVisible={showHistory}
      />
    </div>
  );
};
