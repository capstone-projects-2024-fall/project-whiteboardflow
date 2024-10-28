// Results.js
import React from 'react';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import './Results.css';

const Results = () => {
    const writtenImageUrl = ""; // Placeholder for the image URL of what the user wrote

    const metrics = [
        { name: 'Score', value: '' },
        { name: 'Accuracy', value: '' },
        { name: 'Speed', value: '' },
        { name: 'Completion Time', value: '' },
        { name: 'Attempt Count', value: '' },
    ];

    return (
        <Container className="results-container" maxWidth="md">
            {/* Written Response Image Section - Displayed at the Top */}
            <Box className="written-image-section" textAlign="center" mt={5} mb={5}>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    Written Response
                </Typography>
                {writtenImageUrl ? (
                    <img src={writtenImageUrl} alt="User's Written Response" className="written-image" />
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        No image available
                    </Typography>
                )}
            </Box>

            {/* Results Label */}
            <Box textAlign="center" mt={4} mb={2}>
                <Typography variant="h5" color="primary">
                    Test Results
                </Typography>
            </Box>

            {/* Metrics Grid - Displayed Below the Results Label */}
            <Grid container spacing={3} className="metrics-grid">
                {metrics.map((metric, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card className="metric-card">
                            <CardContent>
                                <Typography variant="h6" color="primary" className="metric-name">
                                    {metric.name}
                                </Typography>
                                <Typography variant="h4" className="metric-value">
                                    {metric.value || "-"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Results;
