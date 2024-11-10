import React, { useState, useEffect, useRef } from 'react';
import './RotatingText.css';

/**
 * RotatingText component that cycles through an array of text messages, 
 * displaying each message with a sliding animation. Supports dark mode styling.
 *
 * @param {Object} props - The props for the RotatingText component.
 * @param {boolean} props.darkMode - Determines if dark mode styling is applied.
 * @returns {JSX.Element} The rendered RotatingText component.
 */
const RotatingText = ({ darkMode }) => {
    /**
     * An array of text objects containing a heading and body for each message.
     * Stored in a ref to prevent reinitialization on re-renders.
     */
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
        /**
         * Interval to automatically update the index for rotating text every 7 seconds.
         * Temporarily disables the slide animation during text transition.
         */
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
        // Updates the current text based on the current index.
        setCurrentText(textArray.current[index]);
    }, [index]);

    return (
        <div className={darkMode ? `rotating-text-dark ${slide ? 'slide-in' : 'slide-out'}` : `rotating-text-light ${slide ? 'slide-in' : 'slide-out'}`}>
            <h2 className="rotating-text-heading">{currentText.heading}</h2>
            <p className="rotating-text-body">{currentText.body}</p>
        </div>
    );
};

export default RotatingText;
