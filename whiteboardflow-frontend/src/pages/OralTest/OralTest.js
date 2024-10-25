import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

var kanRecord = true;

function OralTest() {
    const [resultText, setResultText] = useState('[output]');
    const [isRecording, setIsRecording] = useState(false);
    const [canRecord, setCanRecord] = useState(true);

     useEffect(() => {
    }, [isRecording]);

    function handleButtonClick() {
        if (kanRecord) {
            startRecording();
        }
    }

    function startRecording() {
        console.log('\n\n\n')
        // setCanRecord(false);
        kanRecord = false;

        console.log("Entered startRecording") // TODO
        const eventSource = new EventSource('/api/record');
        
        eventSource.onmessage = function(event) {
            console.log(event.data);
            
            if (event.data === 'recording_started') {
                setIsRecording(true);
            } else {
                stopRecording();
                kanRecord = true;
                setResultText(event.data); // Update the result after recording
                eventSource.close();       // Close the EventSource once done
            }
        };

        eventSource.onerror = function(err) {
            console.error("EventSource failed:", err);
            eventSource.close();
        };
    };

    function stopRecording() {
        setIsRecording(false);
        setCanRecord(true);
    }

    return (
        <div>
            <h1>Welcome to the Oral practice!</h1>
            <Button variant="contained" 
                onClick={handleButtonClick}>
                {!isRecording ? "Record" : "Stop Recording"}
            </Button>
            <h2 className="result-text">{resultText}</h2>
            <h2>{kanRecord}</h2>
        </div>
    );
}

export default OralTest;
