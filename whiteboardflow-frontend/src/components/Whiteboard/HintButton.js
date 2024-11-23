import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { getIdToken } from '../../firebase';
import { useAvatar } from '../Avatar/AvatarContext';
import './css/helpbutton.css'; // Ensure the CSS file is imported here

const HintButton = ({ sendPNGToFirebase }) => {
	const [hintUsed, setHintUsed] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const { setHintMessage, setHintLoading } = useAvatar();

	const getHint = async () => {
		if (hintUsed) {
			setSnackbarOpen(true);
			return;
		}

		setHintUsed(true);
		setHintLoading(true);

		try {
			await sendPNGToFirebase(false);
			const response = await fetchHint();
			setHintMessage(response);
		} catch (error) {
			console.error("Error during image upload or hint response:", error);
		} finally {
			setHintLoading(false);
		}
	}

	const fetchHint = async () => {
		const idToken = await getIdToken();

		try {
			const response = await fetch("/api/get-hint", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					token: idToken,
					question: sessionStorage.getItem("question_text"),
					image: ""
				})
			});

			// Get ChatGPT response
			const result = await response.json();
			return result.message;

		} catch (error) {
			console.error("Error:", error);
		}
	}

	const handleSnackbarClose = () => setSnackbarOpen(false);

	return (
		<>
			<button className='help-button' type="button" onClick={getHint}>
				Request a Hint
			</button>
			{/* Snackbar for hint already used */}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
			>
				<Alert onClose={handleSnackbarClose} severity="warning">
					You have already used a hint for this session.
				</Alert>
			</Snackbar>
		</>
	);
};

export default HintButton;
