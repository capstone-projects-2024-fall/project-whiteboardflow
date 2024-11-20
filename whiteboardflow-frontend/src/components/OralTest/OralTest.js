import { Button, CircularProgress, Typography, Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MicPrompt from '../../components/MicPrompt/MicPrompt';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigate, useOutletContext } from 'react-router-dom'; // Import useNavigate
import { getIdToken, auth } from '../../firebase'
import './OralTest.css';

function OralTest() {
	const navigate = useNavigate(); // Initialize navigate hook
	// eslint-disable-next-line
	const [darkMode, setDarkMode] = useOutletContext();
	const [imageUrl, setImageUrl] = useState(""); // URL for the handwriting image
	const [isEmpty, setIsEmpty] = useState(true)
	const [isRecording, setIsRecording] = useState(true)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {

		const userId = auth.currentUser.uid;
        const storage = getStorage();
        const storageRef = ref(storage, `user-files/${userId}/static.png`);

        getDownloadURL(storageRef)
            .then((url) => {
                setImageUrl(url);
            })
            .catch((error) => {
                console.error("Error fetching image URL: ", error);
            });

	},[])
	
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
					question: sessionStorage.getItem("question_text"),
					image: "",
					transcript: sessionStorage.getItem("finalTranscript")
				})
			});

			// Get ChatGPT response
			const result = await response.json();
			sessionStorage.setItem("AIResponse", result.message);

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

                    <Paper elevation={3} style={{ marginTop: "40px", marginBottom: "40px", padding: '20px', borderRadius: '10px', backgroundColor: darkMode ? '#202124' : '#fff', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold', color: darkMode? '#fff' : '#1976d2' }} gutterBottom>
                            Your work:
                        </Typography>
                        <Box textAlign="center" style={{ paddingTop: '10px', flex: 1 }}>
                            <img
                                src={imageUrl}
                                alt="User's Handwriting Response"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '300px',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                                    margin: '0 auto',
                                }}
                            />
                        </Box>
                    </Paper>
			
		</div>
	);
}

export default OralTest;
