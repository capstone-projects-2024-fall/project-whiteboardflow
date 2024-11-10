import { Button } from '@mui/material';
import MicPrompt from '../../components/MicPrompt/MicPrompt';
import { useNavigate, useOutletContext } from 'react-router-dom'; // Import useNavigate
import { getIdToken } from '../../firebase'
import './OralTest.css';

function OralTest() {
	const navigate = useNavigate(); // Initialize navigate hook

	const [darkMode, setDarkMode] = useOutletContext();
	
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
					<li>Click 'Submit' to submit your response and receive AI-generated feedback.</li>
				</ol>

				{/* <div className="verbal-container"> */}
					<MicPrompt darkMode={darkMode}/>
				{/* </div> */}
			{/* </div> */}
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
