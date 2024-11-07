// Character.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Character.css';

function Character({ message }) {
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
