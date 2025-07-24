import React, { useState } from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    if (firstNumber === null) {
      setFirstNumber(current);
    } else if (operation) {
      const result = calculate(firstNumber, current, operation);
      setFirstNumber(result);
      setDisplay(result.toString());
    }
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '×': return first * second;
      case '÷': return first / second;
      default: return second;
    }
  };

  const handleEqual = () => {
    if (firstNumber === null || operation === null) return;
    const current = parseFloat(display);
    const result = calculate(firstNumber, current, operation);
    setDisplay(result.toString());
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setNewNumber(false);
    }
  };

  const buttonClass = "h-6 w-full text-center bg-gradient-to-b from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 active:from-gray-200 active:to-gray-300 rounded shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 text-sm";
  const operatorClass = "h-6 w-full text-center bg-gradient-to-b from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 active:from-blue-200 active:to-blue-300 rounded shadow-sm hover:shadow-md transition-all duration-200 text-blue-700 border border-blue-200 text-sm font-medium";

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg w-[240px]">
      <div className="flex items-center mb-2 text-gray-700">
        <CalculatorIcon className="w-4 h-4 mr-1" />
        <h3 className="text-sm font-medium">計算機</h3>
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-2 rounded mb-2 shadow-inner border border-gray-200 h-8">
        <div className="flex justify-between items-center h-full">
          <div className="text-xl font-mono flex-1 text-right pr-1">{display}</div>
          {operation && (
            <div className="text-lg font-mono text-blue-600 w-6 flex items-center justify-center">
              {operation}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1">
        {['7', '8', '9', '÷'].map((btn) => (
          <button
            key={btn}
            onClick={() => btn === '÷' ? handleOperation(btn) : handleNumber(btn)}
            className={btn === '÷' ? operatorClass : buttonClass}
          >
            {btn}
          </button>
        ))}
        {['4', '5', '6', '×'].map((btn) => (
          <button
            key={btn}
            onClick={() => btn === '×' ? handleOperation(btn) : handleNumber(btn)}
            className={btn === '×' ? operatorClass : buttonClass}
          >
            {btn}
          </button>
        ))}
        {['1', '2', '3', '-'].map((btn) => (
          <button
            key={btn}
            onClick={() => btn === '-' ? handleOperation(btn) : handleNumber(btn)}
            className={btn === '-' ? operatorClass : buttonClass}
          >
            {btn}
          </button>
        ))}
        {['0', '.', '=', '+'].map((btn) => (
          <button
            key={btn}
            onClick={() => {
              switch (btn) {
                case '=': handleEqual(); break;
                case '+': handleOperation(btn); break;
                case '.': handleDecimal(); break;
                default: handleNumber(btn);
              }
            }}
            className={btn === '+' || btn === '=' ? operatorClass : buttonClass}
          >
            {btn}
          </button>
        ))}
        <button
          onClick={handleClear}
          className="col-span-4 h-6 text-center bg-gradient-to-b from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 active:from-red-200 active:to-red-300 rounded shadow-sm hover:shadow-md transition-all duration-200 text-red-600 border border-red-200 text-sm font-medium"
        >
          クリア
        </button>
      </div>
    </div>
  );
}