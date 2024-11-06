import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { auth } from "../../firebase";
import './Results.css';

const Results = () => {
    const [oralAnalysis, setOralAnalysis] = useState(""); // AI analysis of the oral response
    const [imageUrl, setImageUrl] = useState(""); // URL for the handwriting image

    // Load data from localStorage
    useEffect(() => {
        // Retrieve AI analysis from localStorage
        const aiResponse = localStorage.getItem("AIResponse") || "No analysis available";
        setOralAnalysis(aiResponse);

        const userId = auth.currentUser.uid;
        const storage = getStorage();
        const storageRef = ref(storage, `user-files/${userId}/static.png`);

        // Create a reference to the image file you want to download
        getDownloadURL(storageRef)
            .then((url) => {
                setImageUrl(url); // Set the image URL in the state
            })
            .catch((error) => {
                console.error("Error fetching image URL: ", error);
            });

        // Clear local storage
        // localStorage.clear()
    }, []);

    return (
        <Container className="results-container" maxWidth="md">
            {/* Handwriting Image Section - Displayed at the Top */}
            <Box className="written-image-section" textAlign="center" mt={5} mb={5}>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    Handwriting Response
                </Typography>
                <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
                    <img src={imageUrl} alt="User's Handwriting Response" className="written-image" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                </Paper>
            </Box>

            {/* Results Analysis Label */}
            <Box textAlign="center" mt={4} mb={2}>
                <Typography variant="h5" color="primary">
                    AI Analysis of Oral Response
                </Typography>
            </Box>

            {/* AI Analysis for Oral Response */}
            <Paper
                elevation={3}
                className="analysis-box"
                style={{
                    padding: '20px',
                    backgroundColor: '#f7f9fc',
                    lineHeight: '1.8',
                    fontSize: '1rem',
                    color: '#333',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    textAlign: 'left',
                }}
            >
                <ReactMarkdown>{oralAnalysis}</ReactMarkdown>
            </Paper>

            {/* Placeholder for Future Metrics */}
            <Box textAlign="center" mt={4} mb={2}>
                <Typography variant="h5" color="primary">
                    Completion Time
                </Typography>
            </Box>
            <Paper elevation={3} className="completion-time-box" style={{ padding: '20px', backgroundColor: '#f9f9f9', lineHeight: '1.6' }}>
                <Typography variant="body1" color="textSecondary">
                    {/* Display the completion time when available; placeholder text for now */}
                    Completion time will be displayed here.
                </Typography>
            </Paper>
        </Container>
    );
};

export default Results;
