import React, { useState, useEffect, useRef } from 'react';
import './RotatingText.css';

const RotatingText = () => {
    const textArray = useRef([
        { heading: "Welcome", body: "Discover a new and effective way to approach your upcoming interviews. Practice makes perfect!" },
        { heading: "Prepare with AI Powered Interviews", body: "Gain insights from AI powered question generation and analysis." },
        { heading: "Boost Confidence", body: "Practice and receive immediate constructive feedback from our AI analysis tool." },
        { heading: "Achieve Success", body: "Master the skills to excel in your interviews." }
    ]);

    const [currentText, setCurrentText] = useState(textArray.current[0]);
    const [index, setIndex] = useState(0);
    const [slide, setSlide] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSlide(false);

            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % textArray.current.length);
                setSlide(true);
            }, 500);
        }, 7000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setCurrentText(textArray.current[index]);
    }, [index]);

    return (
        <div className={`rotating-text ${slide ? 'slide-in' : 'slide-out'}`}>
            <h2 className="rotating-text-heading">{currentText.heading}</h2>
            <p className="rotating-text-body">{currentText.body}</p>
        </div>
    );
};

export default RotatingText;
