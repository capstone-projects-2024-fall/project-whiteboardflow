import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { getIdToken } from '../../firebase';
import { useAvatar } from '../Avatar/AvatarContext';
import { makeRequest } from '../../utils/api';
import { auth } from '../../firebase';
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

		const userId = auth.currentUser.uid;
		await sendPNGToFirebase(false, `user-files/${userId}/static.png`);
		const idToken = await getIdToken();
		const hintResponse = await makeRequest(
			'/assistant/hint',
			'POST',
			{
				question: sessionStorage.getItem("question_text"),
				image: "",
				sessionId: sessionStorage.getItem("startTime")
			},
			idToken
		);

		setHintMessage(hintResponse.message);
		setHintLoading(false);
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
