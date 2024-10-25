import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import MicPrompt from '../../components/MicPrompt/MicPrompt';

var canRecord = true;

function OralTest() {
    const [resultText, setResultText] = useState('[output]');
    const [isRecording, setIsRecording] = useState(false);

     useEffect(() => {
    }, [isRecording]);

    function handleButtonClick() {
        if (canRecord) {
            startRecording();
        }
    }

    function startRecording() {
        console.log('\n\n\n')
        canRecord = false;

        console.log("Entered startRecording") // TODO
        const eventSource = new EventSource('/api/record');
        
        eventSource.onmessage = function(event) {
            console.log(event.data);
            
            if (event.data === 'recording_started') {
                setIsRecording(true);
            } else {
                stopRecording();
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
        canRecord = true;
    }

    return (
        <div>
            <h1>Welcome to the Oral practice!</h1>
            <MicPrompt></MicPrompt>
        </div>
    );
}

export default OralTest;
