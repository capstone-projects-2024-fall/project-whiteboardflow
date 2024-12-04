import React, { useEffect, useState } from 'react';
import { Button, Paper, Container, Typography, Box, Grid } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useOutletContext } from 'react-router-dom'; // Import useNavigate
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import './Result.css';

const Results = () => {
    const [darkMode, setDarkMode] = useOutletContext();
    const navigate = useNavigate();

    const [questionText, setQuestionText] = useState(""); // Question text
    const [imageUrl, setImageUrl] = useState(""); // URL for the handwriting image
    const [transcript, setTranscript] = useState("");
    const [oralAnalysis, setOralAnalysis] = useState(""); // AI analysis of the oral response
    const [completionTime, setCompletionTime] = useState(""); // Formatted completion time

    const paperStyle = {
        backgroundColor: darkMode ? '#202124' : 'white',
        color: darkMode ? 'white' : '#202124',
    };

    const headerStyle = {
        color: 'primary.main',
    };

    useEffect(() => {
        const aiResponse = sessionStorage.getItem("AIResponse") || "No analysis available";
        setOralAnalysis(aiResponse);

        setQuestionText(sessionStorage.getItem("question_text"));

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
        setTranscript(sessionStorage.getItem("finalTranscript"));
    }, []);

    const calculateCompletionTime = () => {
        const startTime = sessionStorage.getItem("startTime");
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

    const handleNav = (path) => {
        if (path === '/' || path === '/questionSelect') {
            sessionStorage.clear();
        } else if (path === '/whiteboard') {
            sessionStorage.setItem("startTime", Date.now());
            sessionStorage.removeItem("finalTranscript");
            sessionStorage.removeItem("AIResponse");
        }
        navigate(path);
    }

    const gridItems = [
        {
            xs: 12, md: 6,
            title: "Practice Question",
            content: <Typography className="box-text" variant="body1"><strong>Question: </strong>{questionText}</Typography>
        },
        {
            xs: 12, md: 6,
            title: "Your Handwritten Response",
            content: <Box className="box" textAlign="center"><img className="box-image" src={imageUrl} alt="User's Handwriting Response" /></Box>
        },
        {
            xs: 12,
            title: "AI Analysis of Whiteboard Practice",
            content: <ReactMarkdown>{oralAnalysis}</ReactMarkdown>
        },
        {
            xs: 12, md: 6,
            title: "Completion Time",
            content: <Typography className="box-text" variant="body1">{completionTime}</Typography>
        },
        {
            xs: 12, md: 6,
            title: "Verbal transcription",
            content: <Typography variant="body1" style={{ color: darkMode ? '#fff' : '#202124' }}>{transcript}</Typography>
        },
    ];

    return (
        <Container className="container" maxWidth="lg">
            <Typography
                className="header"
                variant="h4"
                sx={{
                    color: headerStyle.color,
                    marginBottom: '25px'
                }}
            >
                Practice Results Dashboard
            </Typography>
            <Grid container spacing={3}>
                {gridItems.map((item, index) => (
                    <Grid item xs={item.xs} md={item.md} key={index}>
                        <Paper className="paper" style={paperStyle} elevation={3}>
                            <Typography
                                className="paper-header"
                                variant="h6"
                                gutterBottom
                                sx={{
                                    color: headerStyle.color,
                                    fontWeight: "bold"
                                }}
                            >
                                {item.title}
                            </Typography>
                            <Box className="box">
                                {item.content}
                            </Box>
                        </Paper>
                    </Grid>
                ))}

                <Box className="button-box">
                    <Button variant="contained" color="primary" onClick={() => handleNav("/")}>Home</Button>
                    <Button variant="contained" color="primary" onClick={() => handleNav("/whiteboard")}>Try Again</Button>
                    <Button variant="contained" color="primary" onClick={() => handleNav("/questionSelect")}>New Question</Button>
                </Box>
            </Grid>
        </Container>
    );
};

export default Results;