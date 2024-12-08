import React from 'react';
import { Button, Paper, Container, Typography, Box, Grid } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import './Result.css';

const Results = ({
    question,
    imageUrl,
    transcript,
    oralAnalysis,
    completionTime,
}) => {
    const [darkMode] = useOutletContext();
    const navigate = useNavigate();
    const location = useLocation();
    const isHistory = location.pathname.startsWith('/history/');

    // Destructure state from location if available, otherwise use props.
    const { state } = location;
    const {
        question: stateQuestion,
        imageUrl: stateImageUrl,
        transcript: stateTranscript,
        oralAnalysis: stateOralAnalysis,
        completionTime: stateCompletionTime,
    } = state || {};

    // Fallback to props if location.state is undefined
    const effectiveQuestion = stateQuestion || question;
    const effectiveImageUrl = stateImageUrl || imageUrl;
    const effectiveTranscript = stateTranscript || transcript;
    const effectiveOralAnalysis = stateOralAnalysis || oralAnalysis;
    const effectiveCompletionTime = stateCompletionTime || completionTime;

    const paperStyle = {
        backgroundColor: darkMode ? '#202124' : 'white',
        color: darkMode ? 'white' : '#202124',
    };

    const headerStyle = {
        color: 'primary.main',
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
            content: <Typography className="box-text" variant="body1"><strong>Question: </strong>{effectiveQuestion}</Typography>
        },
        {
            xs: 12, md: 6,
            title: "Your Handwritten Response",
            content: <Box className="box" textAlign="center"><img className="box-image" src={effectiveImageUrl} alt="User's Handwriting Response" /></Box>
        },
        {
            xs: 12,
            title: "AI Analysis of Whiteboard Practice",
            content: <ReactMarkdown>{effectiveOralAnalysis}</ReactMarkdown>
        },
        {
            xs: 12, md: 6,
            title: "Completion Time",
            content: <Typography className="box-text" variant="body1">{effectiveCompletionTime}</Typography>
        },
        {
            xs: 12, md: 6,
            title: "Verbal transcription",
            content: <Typography variant="body1" style={{ color: darkMode ? '#fff' : '#202124' }}>{effectiveTranscript}</Typography>
        },
    ];

    return (
        <Container className="container" maxWidth="lg">
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                marginBottom: '40px'
            }}>
                {isHistory && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(-1)}
                        sx={{
                            fontSize: '16px',
                            padding: '4px 2px',
                            minWidth: '125px',
                        }}
                    >
                        Back
                    </Button>
                )}
                <Typography
                    className="header"
                    variant="h4"
                    sx={{
                        color: headerStyle.color,
                        textAlign: 'center',
                        flexGrow: 1,
                        marginRight: isHistory ? '100px' : '0px',
                    }}
                >
                    Practice Results Dashboard
                </Typography>
            </Box>
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
                {location.pathname === '/results' && (
                    <Box className="button-box">
                        <Button variant="contained" color="primary" onClick={() => handleNav("/")}>Home</Button>
                        <Button variant="contained" color="primary" onClick={() => handleNav("/whiteboard")}>Try Again</Button>
                        <Button variant="contained" color="primary" onClick={() => handleNav("/questionSelect")}>New Question</Button>
                    </Box>
                )}
            </Grid>
        </Container >
    );
};

export default Results;