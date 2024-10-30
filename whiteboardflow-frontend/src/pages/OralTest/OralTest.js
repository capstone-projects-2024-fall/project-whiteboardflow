import { Button } from '@mui/material';
import MicPrompt from '../../components/MicPrompt/MicPrompt';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './OralTest.css';

function OralTest() {
	const navigate = useNavigate(); // Initialize navigate hook

	const submitResponseData = async () => {
		try {
			const response = await fetch("/api/get-response", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					// Data to send to FastAPI
					question: "Write a helloWorld function", // TODO Don't hardcode this
					image: "",
					transcript: localStorage.getItem("finalTranscript")
				})
			});

			// Get ChatGPT response
			const result = await response.json();
			localStorage.setItem("AIResponse", result.message);
			//alert(result.message);

			// Navigate to Results page after successful response
			navigate('/results');

		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div>
			<div className="container">
				<h1>Welcome to the oral portion of the test!</h1>
				<h4>Instructions:</h4>
				<ol>
					<li>Click the 'Record' button, then explain your thought process for your written answer.</li>
					<li>Click 'Stop Recording' when you are finished.</li>
					<li>Click 'Submit' to submit your response and receive AI-generated feedback.</li>
				</ol>

				<div className="container">
					<MicPrompt />
				</div>
			</div>
			<Button
				className="submit-button"
				variant="contained"
				onClick={submitResponseData}
			>
				Submit
			</Button>
		</div>
	);
}

export default OralTest;
