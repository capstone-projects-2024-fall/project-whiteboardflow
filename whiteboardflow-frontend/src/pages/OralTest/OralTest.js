import { Button } from '@mui/material';
import MicPrompt from '../../components/MicPrompt/MicPrompt';

function OralTest() {

	const submitResponseData = async () => {
		try {
			const response = await fetch("/api/get-response", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					// Data to send to FastAPI
					question: '[insert question]',
					image: '[insert image]',
					transcript: localStorage.getItem("finalTranscript")
				})
			});

			// Get ChatGPT response
			const result = await response.json();
			localStorage.setItem("AIResponse", result.message);
			alert(result.message)

		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div>
			<h1>Welcome to the Oral practice!</h1>
			<MicPrompt></MicPrompt>
			<Button
				variant="contained"
				onClick={submitResponseData}
			>Submit
			</Button>
		</div>
	);
}

export default OralTest;
