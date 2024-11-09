import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { auth } from "../../firebase";
import DOMPurify from "dompurify"; // Import for sanitizing HTML
import './Results.css';

const Results = () => {
    const [oralAnalysis, setOralAnalysis] = useState(""); // AI analysis of the oral response
    const [imageUrl, setImageUrl] = useState(""); // URL for the handwriting image
    const [questionText, setQuestionText] = useState(""); // Question text

    // Load data from localStorage
    useEffect(() => {
        // Retrieve AI analysis and question text from localStorage
        const aiResponse = localStorage.getItem("AIResponse") || "No analysis available";
        setOralAnalysis(aiResponse);

        const storedQuestion = localStorage.getItem("question") || "No question available.";
        setQuestionText(storedQuestion);

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
    }, []);

    return (
        <Container maxWidth="lg" style={{ padding: '30px', backgroundColor: '#f4f6f8' }}>
            <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
                Practice Results Dashboard
            </Typography>
            <Grid container spacing={3}>
                {/* Question Text Section - Left Column */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#fff', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold', color: '#1976d2' }} gutterBottom>
                            Practice Question
                        </Typography>
                        <Box style={{ padding: '10px', backgroundColor: '#f7f9fc', borderRadius: '8px', overflowY: 'auto', flex: 1 }}>
                            {/* Display sanitized HTML content of the question */}
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(questionText) }} />
                        </Box>
                    </Paper>
                </Grid>

                {/* Handwriting Image Card - Right Column */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#fff', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold', color: '#1976d2' }} gutterBottom>
                            Your Handwritten Response
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
                </Grid>

                {/* AI Analysis Card - Full Width */}
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold', color: '#1976d2' }} gutterBottom>
                            AI Analysis of Whiteboard Practice
                        </Typography>
                        <Box style={{
                            overflowY: 'auto',
                            padding: '10px',
                            backgroundColor: '#f7f9fc',
                            borderRadius: '8px',
                            flex: 1
                        }}>
                            <ReactMarkdown>{oralAnalysis}</ReactMarkdown>
                        </Box>
                    </Paper>
                </Grid>

                {/* Completion Time Card - Left Column */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold', color: '#1976d2' }} gutterBottom>
                            Completion Time
                        </Typography>
                        <Typography variant="body1" color="textSecondary" style={{ marginTop: '10px', flex: 1 }}>
                            Completion time will be displayed here.
                        </Typography>
                    </Paper>
                </Grid>

                {/* Placeholder for Future Metrics or Other Information - Right Column */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold', color: '#1976d2' }} gutterBottom>
                            Additional Information
                        </Typography>
                        <Typography variant="body1" color="textSecondary" style={{ marginTop: '10px', flex: 1 }}>
                            Placeholder for future metrics or insights.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Results;
