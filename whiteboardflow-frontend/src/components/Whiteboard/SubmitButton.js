import React from 'react';
import './css/submitbutton.css'; // Ensure the CSS file is imported here

/**
 * ${1:Description placeholder}
 *
 * @param {{ onExport: any; }} param0
 * @param {${2:*}} param0.onExport
 * @returns {${3:*}\}
 */
const SubmitButton = ({ onExport }) => {
    return (
        <button className="export-button" onClick={onExport}>Submit</button>
    );
};

export default SubmitButton;
