import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Grid, LinearProgress } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { auth } from "../../firebase";
import DOMPurify from "dompurify";
import './Results.css';

const Results = () => {
    const [oralAnalysis, setOralAnalysis] = useState(""); // AI analysis of the oral response
    const [imageUrl, setImageUrl] = useState(""); // URL for the handwriting image
    const [questionText, setQuestionText] = useState(""); // Question text
    const [completionTime, setCompletionTime] = useState(""); // Formatted completion time
    const [accuracy, setAccuracy] = useState(0); // Estimated accuracy percentage

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

    // Estimate accuracy from the analysis text using expanded keyword lists
    const calculateAccuracy = (analysisText) => {
        const positiveKeywords = [
            "correct", "good", "accurate", "excellent", "well-done", "precise", "clear",
            "successful", "effective", "strong", "consistent", "thorough", "proficient",
            "skillful", "competent", "insightful", "impressive", "positive", "satisfactory",
            "noteworthy", "complete", "on-point", "valid", "acceptable", "outstanding",
            "exceptional"
        ];

        const negativeKeywords = [
            "incorrect", "mistake", "error", "wrong", "poor", "unclear", "failed",
            "ineffective", "weak", "inconsistent", "lacking", "incomplete", "subpar",
            "deficient", "inadequate", "unsatisfactory", "disappointing", "vague", "flawed",
            "negative", "invalid", "unacceptable", "problematic", "off-track", "misguided",
            "insufficient", "absent", "you need to", "missing", "does not provide", "image does not"
        ];

        // Count occurrences of positive and negative keywords
        let positiveCount = 0;
        let negativeCount = 0;

        positiveKeywords.forEach((word) => {
            positiveCount += (analysisText.match(new RegExp(word, "gi")) || []).length;
        });

        negativeKeywords.forEach((word) => {
            negativeCount += (analysisText.match(new RegExp(word, "gi")) || []).length;
        });

        // Calculate approximate accuracy percentage
        const totalKeywords = positiveCount + negativeCount;
        if (totalKeywords === 0) return 0; // Neutral accuracy set to 0% if no keywords are found

        const accuracyPercentage = (positiveCount / totalKeywords) * 100;
        return Math.round(accuracyPercentage);
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

        // Calculate and set accuracy from the analysis text
        const estimatedAccuracy = calculateAccuracy(aiResponse);
        setAccuracy(estimatedAccuracy);
    }, []);

    return (
        <Container maxWidth="lg" style={{ padding: '30px', backgroundColor: '#f4f6f8' }}>
            <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
                Practice Results Dashboard
            </Typography>
            <Grid container spacing={3}>

                {/* Practice Question */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#fff', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold', color: '#1976d2' }} gutterBottom>
                            Practice Question
                        </Typography>
                        <Box style={{ padding: '10px', backgroundColor: '#f7f9fc', borderRadius: '8px', overflowY: 'auto', flex: 1 }}>
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(questionText) }} />
                        </Box>
                    </Paper>
                </Grid>

                {/* Handwriting Image */}
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

                {/* AI Analysis */}
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

                {/* Completion Time */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold', color: '#1976d2' }} gutterBottom>
                            Completion Time
                        </Typography>
                        <Typography variant="body1" color="textSecondary" style={{ marginTop: '10px', flex: 1 }}>
                            {completionTime}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Accuracy Metric */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold', color: '#1976d2' }} gutterBottom>
                            Estimated Accuracy
                        </Typography>
                        <Box mt={2}>
                            <LinearProgress
                                variant="determinate"
                                value={accuracy}
                                style={{
                                    height: '10px',
                                    borderRadius: '5px',
                                }}
                            />
                            <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '10px' }}>
                                {accuracy}% Accuracy
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Results;
