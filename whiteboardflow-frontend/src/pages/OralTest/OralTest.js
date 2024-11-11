import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import MicPrompt from '../../components/MicPrompt/MicPrompt';
import { useNavigate, useOutletContext } from 'react-router-dom'; // Import useNavigate
import { getIdToken } from '../../firebase'
import './OralTest.css';

function OralTest() {
	const navigate = useNavigate(); // Initialize navigate hook

	const [darkMode, setDarkMode] = useOutletContext();

	const [isEmpty, setIsEmpty] = useState(true)
	const [isRecording, setIsRecording] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	
	const setNotEmpty = () => {
		setIsEmpty(false);
	}

	const setEmpty = () => {
		setIsEmpty(true);
	}

	const setRecording = () => {
		setIsRecording(true)
	}

	const setNotRecording = () => {
		setIsRecording(false)
	}

	const triggerLoading = () => {
		setIsLoading(true);
	}

	const submitResponseData = async () => {
		const idToken = await getIdToken();

		try {
			const response = await fetch("/api/get-result", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					// Data to send to FastAPI
					token: idToken,
					question: localStorage.getItem("question"),
					image: "",
					transcript: localStorage.getItem("finalTranscript")
				})
			});

			// Get ChatGPT response
			const result = await response.json();
			localStorage.setItem("AIResponse", result.message);

			// Navigate to Results page after successful response
			navigate('/results');

		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div className='verbal-page'>
			{/* <div className="verbal-container"> */}
				<h1>Whiteboard Assistant: Verbal Assessment</h1>
				<h4>Instructions:</h4>
				<ol>
					<li>Click the 'Record' button, then explain your thought process for your written answer.</li>
					<li>Click 'Stop Recording' when you are finished.</li>
					<li>A "Submit" button will appear when you are finished.</li>
					<li>Click 'Submit' to submit your response and receive AI-generated feedback.</li>
				</ol>

				{/* <div className="verbal-container"> */}
					<MicPrompt 
						darkMode={darkMode}
						setRecording={setRecording}
						setNotRecording={setNotRecording}
						setEmpty={setEmpty}
						setNotEmpty={setNotEmpty}
					/>
				{/* </div> */}
			{/* </div> */}
			{(!isRecording && !isEmpty && !isLoading) && 
			
			<Button
				className="submit-button"
				variant="contained"
				onClick={(e) => {triggerLoading(); submitResponseData()}}
			>
				Submit
			</Button> 
			
			}

			{isLoading && 
			
			
		<CircularProgress color="inherit" />

}
			
		</div>
	);
}

export default OralTest;
