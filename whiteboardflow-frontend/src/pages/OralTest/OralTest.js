import React from 'react';
import { Button } from '@mui/material';

function OralTest() {
    const handleButtonClick = () => {
        fetch('api/record')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert(data.message);
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
        </div>
    );
}

export default OralTest;