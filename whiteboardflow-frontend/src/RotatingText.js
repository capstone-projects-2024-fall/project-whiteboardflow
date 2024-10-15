import React, { useState, useEffect } from 'react';
import './RotatingText.css';

const RotatingText = () => {
    const textArray = [
        { heading: "Welcome", body: "Discover a new and effective way to approach your upcoming interviews. Practice makes perfect!" },
        { heading: "Prepare with AI Powered Interviews", body: "Gain insights from AI powered question generation and analysis." },
        { heading: "Boost Confidence", body: "Practice and receive immediate constructive feedback from our AI analysis tool." },
        { heading: "Achieve Success", body: "Master the skills to excel in your interviews." }
    ];

    const [currentText, setCurrentText] = useState(textArray[0]);
    const [index, setIndex] = useState(0);
    const [slide, setSlide] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSlide(false); // Begin transition out

            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % textArray.length); // Update index
                setSlide(true); // Begin transition in
            }, 500); // Slide-out duration
        }, 3000); // Change text every 3 seconds

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setCurrentText(textArray[index]);
    }, [index]);

    return (
        <div className={`rotating-text ${slide ? 'slide-in' : 'slide-out'}`}>
            <h2 className="rotating-text-heading">{currentText.heading}</h2>
            <p className="rotating-text-body">{currentText.body}</p>
        </div>
    );
};

export default RotatingText;
