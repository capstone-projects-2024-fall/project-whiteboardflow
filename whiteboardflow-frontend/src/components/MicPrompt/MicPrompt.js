import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import "./MicPrompt.css"

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
}

const MicPrompt = ({darkMode, setRecording, setNotRecording, setEmpty, setNotEmpty}) => {
	const [listening, setListening] = useState(false);
	

	const handleListen = () => {
		console.log('listening?', listening);

		if (listening) {
			recognition.start();
			recognition.onend = () => {
				console.log("...continue listening...");
				recognition.start();
			};
		} else {
			recognition.stop();
			recognition.onend = () => {
				console.log("Stopped listening per click");
			};
		}

		recognition.onstart = () => {
			console.log("Listening!");
			document.getElementById('final').innerHTML = "";
			sessionStorage.setItem("finalTranscript", "");
		};

		let finalTranscript = '';
		recognition.onresult = (event) => {
			let interimTranscript = '';

			for (let i = event.resultIndex; i < event.results.length; i++) {
				const transcript = event.results[i][0].transcript;
				if (event.results[i].isFinal) finalTranscript += transcript + ' ';
				else interimTranscript += transcript;
			}
			document.getElementById('interim').innerHTML = interimTranscript;
			document.getElementById('final').innerHTML = finalTranscript;
			sessionStorage.setItem("finalTranscript", finalTranscript);
		};

		recognition.onerror = (event) => {
			console.log("Error occurred in recognition: " + event.error);
		};
	};

	const toggleListen = () => {
		listening ? setNotRecording() : setRecording();
		setListening((prevListening) => !prevListening);
		setNotEmpty() 
	};

	useEffect(() => {
		handleListen();
		// eslint-disable-next-line
	}, [listening]);

	return (
		<div>
			<Button
				sx={{marginTop: '10px'}}
				id='microphone-btn' 
				onClick={toggleListen}
				variant="contained"
			>
				{listening ? "Stop recording" : "Record"}
			</Button>
			<div className={darkMode ? "transcription-box-dark" :"transcription-box-light"}>
				<div id='final'></div>
				<div className={darkMode ? listening ? "interim-box-dark" : "" : listening ? "interim-box-light" : ""} id='interim'></div>
			</div>
		</div>
	);
};

export default MicPrompt;
