import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  testId?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  children,
  testId,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      className={twMerge(
        clsx(
          "h-12 border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100",
          "transition-colors duration-150 text-lg font-medium",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )
      )}
    >
      {children}
    </button>
  );
};
