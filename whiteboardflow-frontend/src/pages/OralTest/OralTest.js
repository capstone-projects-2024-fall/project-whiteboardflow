import React from 'react';
import { Button } from '@mui/material';

function OralTest() {
    const handleButtonClick = () => {
        fetch('/api/record')
            .then((response) => response.json())
            .then((data) => {
                const resultTextElement = document.querySelector('.result-text');
                console.log(data);
                resultTextElement.innerText = data.message;
          })
            .catch((error) => {
                console.error('Error:', error);
          });
    }

    return (
        <div>
            <h1>Welcome to the Oral practice!</h1>
            <Button variant="contained" onClick={handleButtonClick}>
                Record
            </Button>
            <h2 className="result-text">[output]</h2>
        </div>
    );
}

export default OralTest;