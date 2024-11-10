import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Main.js'; // Import the Main component
import reportWebVitals from './reportWebVitals.js';

/**
 * The root of the React application, responsible for rendering the Main component
 * into the HTML root element.
 *
 * @type {ReactDOM.Root}
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Renders the Main component into the DOM.
 */
root.render(
    <Main />
);

/**
 * Initializes web vitals reporting to measure and log performance metrics.
 * Pass a function to log results (e.g., reportWebVitals(console.log)) or 
 * send data to an analytics endpoint. More information: https://bit.ly/CRA-vitals
 */
reportWebVitals();
