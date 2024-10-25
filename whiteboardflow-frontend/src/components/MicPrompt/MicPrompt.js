import React, { useState } from 'react';

/**
 * Microphone prompt which allows the user to record their response during the
 * oral test.
 * @component
 */
function MicPrompt() {
	const [transcript, setTranscript] = useState("");
	const [isListening, setIsListening] = useState(false);

	// Initialize Speech Recognition
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	const recognition = new SpeechRecognition();

	// Set options
	recognition.lang = 'en-US'; // Set language (can be changed based on requirements)
	recognition.continuous = true; // If true, keeps recognizing until stopped
	recognition.interimResults = false; // If true, it returns partial (interim) results while speaking

	// Define events
	recognition.onstart = function () {
		console.log('Speech recognition started.');
	};

	recognition.onresult = (event) => {
		const newTranscript = event.results[0][0].transcript;
		// event.results is an array that contains transcript data
		setTranscript(newTranscript);
		console.log('You said: ', newTranscript);
	};

	recognition.onerror = function (event) {
		console.log('Error occurred: ', event.error);
	};

	recognition.onaudioend = function() {
		console.log("Audio ended");
	}

	recognition.onend = function () {
		console.log('Speech recognition ended.');
	};
	
	// Start recognition
	function startRecognition() {
		if (!isListening) {
			recognition.start();
			setIsListening(true);
		}
	}

	function stopRecognition() {
		if (isListening) {
			let t = recognition.stop();
			recognition.abort();
			console.log(t);
			setTranscript()
			setIsListening(false);
		}
	}

	return (
		<div>
			<h2>Speech to Text Demo</h2>
			<button onClick={isListening ? stopRecognition : startRecognition}>
				{isListening ? "Stop Listening" : "Start Listening"}
			</button>
			<div>
				<h3>Transcript:</h3>
				<p>{transcript || "No speech detected yet..."}</p>
			</div>
		</div>
	);
};

export default MicPrompt;