import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useOutletContext } from 'react-router-dom'; // Import useNavigate
import { auth } from "../../firebase";
import DOMPurify from "dompurify";
import './Results.css';

const Results = () => {
    const [darkMode, setDarkMode] = useOutletContext();
    const [oralAnalysis, setOralAnalysis] = useState(""); // AI analysis of the oral response
    const [imageUrl, setImageUrl] = useState(""); // URL for the handwriting image
    const [questionText, setQuestionText] = useState(""); // Question text
    const [completionTime, setCompletionTime] = useState(""); // Formatted completion time

    const calculateCompletionTime = () => {
        const startTime = localStorage.getItem("startTime");
        if (startTime) {
            const endTime = Date.now();
            const timeSpent = (endTime - startTime) / 1000;
            const seconds = Math.floor(timeSpent % 60);
            const minutes = Math.floor((timeSpent / 60) % 60);
            const hours = Math.floor((timeSpent / (60 * 60)) % 24);
            return `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 ? `${minutes}m ` : ""}${seconds}s`;
        }
        return "Not available";
    };

    useEffect(() => {
        const aiResponse = localStorage.getItem("AIResponse") || "No analysis available";
        setOralAnalysis(aiResponse);

        const storedQuestion = localStorage.getItem("question_html") || "No question available.";
        setQuestionText(storedQuestion);

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

        setCompletionTime(calculateCompletionTime());
    }, []);

    return (
        <Container maxWidth="lg" style={{ textAlign: 'center', paddingTop: "70px", padding: '30px', backgroundColor: darkMode ? '#202124' : 'white' }}>
            <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '20px', color: darkMode ? "white" : '#1976d2' }}>
                Practice Results Dashboard
            </Typography>
            <Grid container spacing={3}>

                {/* Practice Question */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', backgroundColor: darkMode ? '#202124' : 'white', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold', color: darkMode ? 'white' : '#202124' }} gutterBottom>
                            Practice Question
                        </Typography>
                        <Box style={{ padding: '10px', backgroundColor: darkMode ? '#C7C7C8' : "#fff", borderRadius: '8px', overflowY: 'auto', flex: 1 }}>
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(questionText) }} />
                        </Box>
                    </Paper>
                </Grid>

                {/* Handwriting Image */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', backgroundColor: darkMode ? '#202124' : '#fff', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#1976d2' }} gutterBottom>
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

                {/* AI Analysis */}
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', backgroundColor: darkMode ? '#202124' : '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#1976d2' }} gutterBottom>
                            AI Analysis of Whiteboard Practice
                        </Typography>
                        <Box style={{
                            overflowY: 'auto',
                            padding: '10px',
                            backgroundColor: darkMode ? '#C7C7C8' : "#fff",
                            borderRadius: '8px',
                            flex: 1
                        }}>
                            <ReactMarkdown>{oralAnalysis}</ReactMarkdown>
                        </Box>
                    </Paper>
                </Grid>

                {/* Completion Time */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', backgroundColor: darkMode ? '#202124' : '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#1976d2' }} gutterBottom>
                            Completion Time
                        </Typography>
                        <Typography variant="body1" style={{ color: darkMode ? '#fff' : '#1976d2', marginTop: '10px', flex: 1 }}>
                            {completionTime}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Results;
