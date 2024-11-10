// Character.js

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Character.css';

/**
 * A character component that displays an animated character with a talking bubble.
 * The bubble displays a message when the character is clicked, toggling its visibility.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {string} props.message - The message to display in the talking bubble.
 * @returns {JSX.Element} An animated character component with a toggleable message bubble.
 * 
 * @example
 * // Example usage of the Character component
 * <Character message="Hello! I'm here to help you." />
 */
function Character({ message }) {
    /** 
     * State to control the visibility of the message bubble.
     * @type {boolean}
     */
    const [showBubble, setShowBubble] = useState(false);

    return (
        <div className="character-container" onClick={() => setShowBubble(!showBubble)}>
            <motion.div
                className="character"
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                😊
            </motion.div>
            {showBubble && (
                <motion.div
                    className="talk-bubble"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <p>{message}</p>
                </motion.div>
            )}
        </div>
    );
}

export default Character;
