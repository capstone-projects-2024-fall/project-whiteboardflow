import React, { useEffect, useState } from 'react';
import { Button, Container, Typography, Box, Paper, Grid } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useOutletContext } from 'react-router-dom';
import { auth, getOneHistory, getOneQuestion } from "../../firebase";
import './Results.css';
import { useLocation } from 'react-router-dom';
import QuestionDisplay from '../Whiteboard/QuestionDisplay';
import { useNavigate } from 'react-router-dom';

const Results = () => {
    // Get session ID from navigation state
    const { state } = useLocation();
    const session_id = state;

    // State variables
    const [darkMode, setDarkMode] = useOutletContext();
    const navigate = useNavigate();
    const [oralAnalysis, setOralAnalysis] = useState(""); // AI analysis of verbal response
    const [barChart, setBarChart] = useState(""); // Base64 image for bar chart
    const [imageUrl, setImageUrl] = useState(""); // URL for the handwriting image
    const [questionJson, setQuestionJson] = useState(null); // Question object
    const [completionTime, setCompletionTime] = useState(""); // Formatted completion time
    const [transcript, setTranscript] = useState(""); // Verbal transcript

    useEffect(() => {
        // Fetch results from the database
        getOneHistory(auth.currentUser.uid, session_id.toString())
            .then((res) => {
                const dbResponse = res;

                // Set AI response analysis
                const aiResponse = dbResponse.response || "No analysis available";
                setOralAnalysis(aiResponse);

                // Set transcript
                setTranscript(dbResponse.transcript);

                // Set bar chart image (if available)
                if (dbResponse.barChart) {
                    setBarChart(dbResponse.barChart); // Assume base64 string
                }

                // Get question data
                const savedQuestion = getOneQuestion(dbResponse.questionID);
                if (savedQuestion) {
                    setQuestionJson(savedQuestion);
                }

                // Get handwriting image URL from Firebase
                const userId = auth.currentUser.uid;
                const storage = getStorage();
                const storageRef = ref(storage, `user-files/${userId}/${dbResponse.sessionId}/static.png`);
                getDownloadURL(storageRef)
                    .then((url) => {
                        setImageUrl(url);
                    })
                    .catch((error) => {
                        console.error("Error fetching image URL: ", error);
                    });

                // Set completion time
                setCompletionTime(dbResponse.completionTime);
            })
            .catch((error) => {
                console.error("Error retrieving history from database: ", error);
            });
    }, [session_id]);

    const handleNav = (path) => {
        if (path === '/' || path === '/questionSelect') {
            sessionStorage.clear();
        } else if (path === '/whiteboard') {
            sessionStorage.setItem("startTime", Date.now());
            sessionStorage.removeItem("finalTranscript");
            sessionStorage.removeItem("AIResponse");
        }

        navigate(path);
    };

    return (
        <Container maxWidth="lg" style={{ textAlign: 'left', paddingTop: "70px", padding: '30px', backgroundColor: darkMode ? '#202124' : 'white' }}>
            <Typography variant="h4" style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px', color: darkMode ? "white" : '#1976d2' }}>
                Practice Results Dashboard
            </Typography>
            <Grid container spacing={3}>
                {/* Practice Question */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', backgroundColor: darkMode ? '#202124' : 'white', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold', color: darkMode ? 'white' : '#202124' }} gutterBottom>
                            Practice Question
                        </Typography>
                        <Box style={{ padding: '10px', backgroundColor: darkMode ? '#202124' : "#fff", borderRadius: '8px', overflowY: 'auto', flex: 1 }}>
                            <QuestionDisplay darkMode={darkMode} question={questionJson} />
                        </Box>
                    </Paper>
                </Grid>

                {/* Handwriting Image */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', backgroundColor: darkMode ? '#202124' : '#fff', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" style={{ textAlign: 'center', fontWeight: 'bold', color: darkMode ? '#fff' : '#1976d2' }} gutterBottom>
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
                            backgroundColor: darkMode ? '#202124' : "#fff",
                            borderRadius: '8px',
                            flex: 1,
                            color: darkMode ? "#fff" : "#202124"
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
                        <Typography variant="body1" style={{ color: darkMode ? '#fff' : '#202124', marginTop: '10px', flex: 1 }}>
                            {completionTime}
                        </Typography>
                    </Paper>
                </Grid>


                {/* Trasncript */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', backgroundColor: darkMode ? '#202124' : '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#1976d2' }} gutterBottom>
                            Verbal transcription
                        </Typography>
                        <Typography variant="body1" style={{ color: darkMode ? '#fff' : '#202124', marginTop: '10px', flex: 1 }}>
                            {transcript}
                        </Typography>
                    </Paper>
                </Grid>

                <Box
                    style={{
                        position: 'relative',
                        top: 30,
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        padding: '20px',
                        backgroundColor: darkMode ? '#202124' : '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px',
                        borderTop: '1px solid #ccc',
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleNav("/")}
                    >
                        Home
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleNav("/whiteboard")}
                    >
                        Try Again
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleNav("/questionSelect")}
                    >
                        New Question
                    </Button>
                </Box>
            </Grid>
        </Container>
    );
};

export default Results;
