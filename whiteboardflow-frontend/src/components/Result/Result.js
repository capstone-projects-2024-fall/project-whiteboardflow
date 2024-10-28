// Results.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import './Results.css';

const Results = () => {
    const [oralAnalysis, setOralAnalysis] = useState(""); // AI analysis of the oral response
    const imageUrl = "http://127.0.0.1:8000/images/image.png"; // URL for the handwriting image

    // Load data from localStorage
    useEffect(() => {
        // Retrieve AI analysis from localStorage
        const aiResponse = localStorage.getItem("AIResponse") || "No analysis available";
        setOralAnalysis(aiResponse);
    }, []);

    return (
        <Container className="results-container" maxWidth="md">
            {/* Handwriting Image Section - Displayed at the Top */}
            <Box className="written-image-section" textAlign="center" mt={5} mb={5}>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    Handwriting Response
                </Typography>
                <img src={imageUrl} alt="User's Handwriting Response" className="written-image" />
            </Box>

            {/* Results Analysis Label */}
            <Box textAlign="center" mt={4} mb={2}>
                <Typography variant="h5" color="primary">
                    AI Analysis of Oral Response
                </Typography>
            </Box>

            {/* AI Analysis for Oral Response */}
            <Box textAlign="center" mt={3} mb={5} p={3} className="analysis-box">
                <Typography variant="body1" color="textSecondary">
                    {oralAnalysis}
                </Typography>
            </Box>

            {/* Placeholder for Future Metrics */}
            <Box textAlign="center" mt={4} mb={2}>
                <Typography variant="h5" color="primary">
                    Completion Time
                </Typography>
            </Box>
            <Box textAlign="center" mt={3} mb={5} p={3} className="completion-time-box">
                <Typography variant="body1" color="textSecondary">
                    {/* Display the completion time when available; placeholder text for now */}
                    Completion time will be displayed here.
                </Typography>
            </Box>
        </Container>
    );
};

export default Results;
