import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

const MicPrompt = () => {
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

			const transcriptArr = finalTranscript.split(' ');
			const stopCmd = transcriptArr.slice(-3, -1);
			console.log('stopCmd', stopCmd);

			if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening') {
				recognition.stop();
				recognition.onend = () => {
					console.log('Stopped listening per command');
					const finalText = transcriptArr.slice(0, -3).join(' ');
					document.getElementById('final').innerHTML = finalText;
				};
			}
		};

		recognition.onerror = (event) => {
			console.log("Error occurred in recognition: " + event.error);
		};
	};

	const toggleListen = () => {
		setListening((prevListening) => !prevListening);
	};

	useEffect(() => {
		handleListen();
	}, [listening]);

	return (
		<div>
			<Button
				id='microphone-btn' 
				onClick={toggleListen}
				variant="contained"
			>
				{listening ? "Stop recording" : "Record"}
			</Button>
			<div id='interim'></div>
			<div id='final'></div>
		</div>
	);
};

export default MicPrompt;
