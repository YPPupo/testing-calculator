import React from "react";

interface DisplayProps {
  value: string;
  error: string | null;
  expression?: string;
}

export const Display: React.FC<DisplayProps> = ({
  value,
  error,
  expression,
}) => {
  return (
    <div className="bg-gray-900 text-white p-4 text-right">
      {error ? (
        <div data-testid="error-display" className="text-red-400 text-sm mb-1">
          {error}
        </div>
      ) : null}
      <div className="text-xs text-gray-500 text-right">{expression}</div>
      <div
        data-testid="calculator-display"
        className="text-3xl font-mono overflow-hidden"
      >
        {value}
      </div>
    </div>
  );
};
