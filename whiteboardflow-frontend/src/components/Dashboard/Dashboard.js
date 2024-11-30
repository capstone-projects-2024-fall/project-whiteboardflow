import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Box,
    Paper,
    Grid,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "../../firebase";


import ReactMarkdown from 'react-markdown';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import DOMPurify from "dompurify";
import './Dashboard.css';



const Dashboard = () => {
    const [darkMode, setDarkMode] = useOutletContext();
    const [userAttempts, setUserAttempts] = useState([]);

    useEffect(() => {
        const fetchUserAttempts = async () => {
            const db = getFirestore();
            const userId = auth.currentUser.uid; // Get the current user's UID
            const userHistoryRef = collection(db, "userhistory", userId, "sessions"); // Reference to userhistory

            const snapshot = await getDocs(userHistoryRef);
            const attempts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUserAttempts(attempts);
        };

        fetchUserAttempts().catch((error) => console.error("Error fetching user attempts:", error));
    }, []);

    return (
        <Container
            maxWidth="lg"
            style={{
                textAlign: "left",
                paddingTop: "70px",
                padding: "30px",
                backgroundColor: darkMode ? "#202124" : "white",
            }}
        >
            <Typography
                variant="h4"
                style={{
                    fontWeight: "bold",
                    marginBottom: "20px",
                    color: darkMode ? "white" : "#1976d2",
                }}
            >
                User Practice Dashboard
            </Typography>
            <Grid container spacing={3}>
                {/* User Attempts */}
                <Grid item xs={12}>
                    <Paper
                        elevation={3}
                        style={{
                            padding: "20px",
                            borderRadius: "10px",
                            backgroundColor: darkMode ? "#202124" : "#fff",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Typography
                            variant="h6"
                            style={{
                                fontWeight: "bold",
                                color: darkMode ? "#fff" : "#1976d2",
                            }}
                            gutterBottom
                        >
                            Your Attempts
                        </Typography>
                        <List>
                            {userAttempts.map((attempt) => (
                                <ListItem key={attempt.id} alignItems="flex-start">
                                    <ListItemText
                                        primary={`Question ID: ${attempt.questionID}`}
                                        secondary={
                                            <>
                                                <Typography
                                                    variant="body2"
                                                    style={{ color: darkMode ? "#C7C7C8" : "#000" }}
                                                >
                                                    Completion Time: {attempt.completionTime}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    style={{ color: darkMode ? "#C7C7C8" : "#000" }}
                                                >
                                                    Response: {attempt.response}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    style={{ color: darkMode ? "#C7C7C8" : "#000" }}
                                                >
                                                    Session ID: {attempt.sessionId}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
