import React, { useState } from 'react';
import '../style/calculator.css';

export default function Calculator() {
    const [display, setDisplay] = useState('');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

    // Append a digit or decimal from buttons or programmatic calls
    const handleNumberClick = (num) => {
        const char = String(num);
        if (char === '.' && display.includes('.')) return; // prevent multiple decimals

        if (shouldResetDisplay) {
            setDisplay(char === '.' ? '0.' : char);
            setShouldResetDisplay(false);
            return;
        }

        // Prevent leading multiple zeros: if display is '0' and adding digit, replace
        if (display === '0' && char !== '.') {
            setDisplay(char);
            return;
        }

        setDisplay((prev) => prev + char);
    };

    // Handle typing in the input: allow only digits and one optional decimal
    const handleInputChange = (value) => {
        const v = String(value);
        if (v === '') {
            setDisplay('');
            return;
        }

        // Allow only characters that form a valid partial number
        if (!/^\d*\.?\d*$/.test(v)) return;

        // normalize leading zeros except when followed by a decimal (keep '0.' )
        const normalized = v.replace(/^0+(?=\d)/, '');
        setDisplay(normalized);
        setShouldResetDisplay(false);
    };

    const handleOperationClick = (op) => {
        if (operation && !shouldResetDisplay) {
            const result = calculate(previousValue, parseFloat(display), operation);
            setDisplay(String(result));
            setPreviousValue(result);
        } else {
            setPreviousValue(parseFloat(display));
        }
        setOperation(op);
        setShouldResetDisplay(true);
    };

    const handleEquals = () => {
        if (operation && previousValue !== null) {
            const result = calculate(previousValue, parseFloat(display), operation);
            setDisplay(String(result));
            setPreviousValue(null);
            setOperation(null);
            setShouldResetDisplay(true);
        }
    };

    const handleClear = () => {
        setDisplay('');
        setPreviousValue(null);
        setOperation(null);
        setShouldResetDisplay(false);
    };

    const calculate = (prev, current, op) => {
        switch (op) {
            case '+':
                return prev + current;
            case '-':
                return prev - current;
            case '*':
                return prev * current;
            case '/':
                return prev / current;
            default:
                return current;
        }
    };

    return (
        <div>
            <h1>Calculator</h1>
            <input
                type="text"
                className='display'
                value={display}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleEquals(); }}
            />
            <br />
            <button className='numeric-button' onClick={() => handleNumberClick(1)}>1</button>
            <button className='numeric-button' onClick={() => handleNumberClick(2)}>2</button>
            <button className='numeric-button' onClick={() => handleNumberClick(3)}>3</button>
            <button className='operation-button' onClick={() => handleOperationClick('+')}>+</button>
            <button className='operation-button' onClick={handleEquals}>=</button>
            <br />
            <button className='numeric-button' onClick={() => handleNumberClick(4)}>4</button>
            <button className='numeric-button' onClick={() => handleNumberClick(5)}>5</button>
            <button className='numeric-button' onClick={() => handleNumberClick(6)}>6</button>
            <button className='operation-button' onClick={() => handleOperationClick('-')}>-</button>
            <button className='operation-button' onClick={handleClear}>C</button>
            <br />
            <button className='numeric-button' onClick={() => handleNumberClick(7)}>7</button>
            <button className='numeric-button' onClick={() => handleNumberClick(8)}>8</button>
            <button className='numeric-button' onClick={() => handleNumberClick(9)}>9</button>
            <button className='operation-button' onClick={() => handleOperationClick('*')}>*</button>
            <button className='operation-button' onClick={() => handleOperationClick('/')}>/</button>
            <br />
            <button className='numeric-button' onClick={() => handleNumberClick(0)}>0</button>
            <button className='numeric-button' onClick={() => handleNumberClick('.')}>.</button>
        </div>
    );
}