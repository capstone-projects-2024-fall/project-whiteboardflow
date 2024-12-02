import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useOutletContext } from 'react-router-dom'; // Import useNavigate
import { auth, getOneHistory, getOneQuestion } from "../../firebase";
import './Results.css';
import { useLocation } from 'react-router-dom';
import QuestionDisplay from '../Whiteboard/QuestionDisplay';

const Results = () => {

    //this gets the sesion ID from the navigation
    const { state } = useLocation();
    console.log(state)
    const session_id = state

    // eslint-disable-next-line
    const [darkMode, setDarkMode] = useOutletContext();

    //analysis
    const [oralAnalysis, setOralAnalysis] = useState(""); // AI analysis of the oral response
    
    //image url
    const [imageUrl, setImageUrl] = useState(""); // URL for the handwriting image
   
    //question
    const [questionJson, setQuestionJson] = useState(null); // Question object
    
    // completion time
    const [completionTime, setCompletionTime] = useState(""); // Formatted completion time

    //voice transription
    const [transcript, setTranscript] = useState("")

    useEffect(() => {
   
        //getting the results from the database
        console.log(session_id)
        getOneHistory(auth.currentUser.uid, session_id.toString()).then((res) => {
            const dbResponse = res;

            //setting verbal response
            const aiResponse = dbResponse.response || "No analysis available";
            setOralAnalysis(aiResponse);

            // setting transcript
            setTranscript(dbResponse.transcript)

            //getting question from question db based on question id in result
            const savedQuestion = getOneQuestion(dbResponse.questionID);
            if (savedQuestion) {
                setQuestionJson(savedQuestion); 
            }

            //this is all getting the url
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

            //completion time
            setCompletionTime(dbResponse.completionTime)

        }).catch((error) => {
            console.error("Error retrieving history from database: ", error);
        });

    }, []);


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
                            <QuestionDisplay darkMode = {darkMode} question={questionJson} />
                        </Box>
                    </Paper>
                </Grid>

                {/* Handwriting Image */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', backgroundColor: darkMode ? '#202124' : '#fff', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" style={{ textAlign:'center', fontWeight: 'bold', color: darkMode ? '#fff' : '#1976d2' }} gutterBottom>
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
            </Grid>
        </Container>
    );
};

export default Results;
