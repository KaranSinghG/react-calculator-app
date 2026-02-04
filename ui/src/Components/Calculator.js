import React from 'react';
import '../style/calculator.css';

export default function Calculator() {
    return (
        <div>
            <h1>Calculator</h1>
            <button className='numeric-button'>1</button>
            <button className='numeric-button'>2</button>
            <button className='numeric-button'>3</button>
            <button className='operation-button'>+</button>
            <button className='operation-button'>=</button>
            <br />
            <button className='numeric-button'>4</button>
            <button className='numeric-button'>5</button>
            <button className='numeric-button'>6</button>
            <button className='operation-button'>-</button>
            <button className='operation-button'>C</button>
            <br />
            <button className='numeric-button'>7</button>
            <button className='numeric-button'>8</button>
            <button className='numeric-button'>9</button>
            <button className='operation-button'>*</button>
            <button className='operation-button'>/</button>
        </div>
    );
}