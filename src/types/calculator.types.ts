export interface CalculationHistory {
  id: string;
  operation: string;
  operands: number[];
  result: number;
  timestamp: string;
}

export type Operation = 'add' | 'subtract' | 'multiply' | 'divide' | 'power' | 'sqrt' | 'clear';

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: Operation | null;
  waitingForOperand: boolean;
  history: CalculationHistory[];
  error: string | null;
  currentExpression: string;
}