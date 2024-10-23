import React, { useState } from 'react';
import { Button } from '@mui/material';

function OralTest() {
    const [buttonText, setButtonText] = useState('Record');
    const [resultText, setResultText] = useState('[output]');
    const [isRecording, setRecording] = useState(false);

    function startRecording() {
        setRecording(true);

        const eventSource = new EventSource('/api/record');
        
        eventSource.onmessage = function(event) {
            console.log(event.data);
            
            if (event.data === 'recording_started') {
                setButtonText('Stop Recording');
            } else {
                setResultText(event.data); // Update the result after recording
                setButtonText('Record');   // Reset the button after completion
                eventSource.close();       // Close the EventSource once done
            }
        };

        eventSource.onerror = function(err) {
            console.error("EventSource failed:", err);
            eventSource.close();
        };
    };

    function stopRecording() {
        setRecording(false);
        setButtonText('Record');
    }

    return (
        <div>
            <h1>Welcome to the Oral practice!</h1>
            <Button variant="contained" 
                onClick={isRecording ? stopRecording : startRecording}>
                {buttonText}
            </Button>
            <h2 className="result-text">{resultText}</h2>
        </div>
    );
}

export default OralTest;
