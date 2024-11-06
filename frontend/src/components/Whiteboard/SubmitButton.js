import React from 'react';
import './css/submitbutton.css'; // Ensure the CSS file is imported here

const SubmitButton = ({ onExport }) => {
    return (
        <button className="export-button" onClick={onExport}>Submit</button>
    );
};

export default SubmitButton;
