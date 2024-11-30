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
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { auth } from "../../firebase";

const Dashboard = () => {
    const [darkMode, setDarkMode] = useOutletContext();
    const [userAttempts, setUserAttempts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserAttempts = async () => {
            try {
                //const user = auth.currentUser;
                const user = "gdr0wZx2v4PuNFYWLHgUyMWc5pD2";

                if (!user) {
                    console.error("No authenticated user found.");
                    return;
                }

                //const userId = user.uid;
                const userId = "gdr0wZx2v4PuNFYWLHgUyMWc5pD2";
                console.log("Fetching data for user ID:", userId);

                const db = getFirestore();
                const userHistoryRef = collection(db, "userhistory", userId, "sessions"); // Reference to Firestore collection

                const snapshot = await getDocs(userHistoryRef);
                if (!snapshot.empty) {
                    const attempts = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setUserAttempts(attempts);
                } else {
                    console.warn("No attempts found for user.");
                }
            } catch (error) {
                console.error("Error fetching user attempts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAttempts();
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

            {loading ? (
                <Typography variant="h6" style={{ color: darkMode ? "#fff" : "#000" }}>
                    Loading user attempts...
                </Typography>
            ) : (
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
                            {userAttempts.length > 0 ? (
                                <List>
                                    {userAttempts.map((attempt) => (
                                        <ListItem key={attempt.id} alignItems="flex-start">
                                            <ListItemText
                                                primary={`Question ID: ${attempt.questionID}`}
                                                secondary={
                                                    <>
                                                        <Typography
                                                            variant="body2"
                                                            style={{
                                                                color: darkMode ? "#C7C7C8" : "#000",
                                                            }}
                                                        >
                                                            Completion Time: {attempt.completionTime}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            style={{
                                                                color: darkMode ? "#C7C7C8" : "#000",
                                                            }}
                                                        >
                                                            Response: {attempt.response}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            style={{
                                                                color: darkMode ? "#C7C7C8" : "#000",
                                                            }}
                                                        >
                                                            Session ID: {attempt.sessionId}
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography
                                    variant="body1"
                                    style={{
                                        color: darkMode ? "#C7C7C8" : "#000",
                                        marginTop: "20px",
                                    }}
                                >
                                    No attempts found. Start practicing to see your results here!
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default Dashboard;
