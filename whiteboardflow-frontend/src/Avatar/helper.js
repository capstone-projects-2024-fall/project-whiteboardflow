import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Helper component props.
 * @typedef {Object} HelperProps
 * @property {string} message - The message to display in the helper bubble.
 */

/**
 * Helper component that displays a message bubble when hovered.
 * @param {HelperProps} props - The props containing the message.
 * @returns {JSX.Element} A helper component with a hover-triggered message bubble.
 */
const Helper = ({ message }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -10 }}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
            >
                <div className="helper-bubble">{message}</div>
            </motion.div>
        </div>
    );
};

export default Helper;
