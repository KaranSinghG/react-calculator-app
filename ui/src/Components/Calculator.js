import React, { useState } from 'react';
import '../style/calculator.css';

export default function Calculator() {
    const [display, setDisplay] = useState('');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

    const handleNumberClick = (num) => {
        if (shouldResetDisplay) {
            setDisplay(String(num));
            setShouldResetDisplay(false);
        } else {
            setDisplay(display + num);
        }
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
            <input type="text" className='display' readOnly value={display} />
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