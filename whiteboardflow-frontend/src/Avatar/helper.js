import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * A helper component that displays a message bubble with a fade-in animation when hovered over.
 *
 * @component
 * @param {Object} props - The properties for the Helper component.
 * @param {string} props.message - The message displayed inside the helper bubble.
 * @returns {JSX.Element} A message bubble that appears on hover.
 * 
 * @example
 * // Example usage of the Helper component
 * <Helper message="Hover over me for tips!" />
 */
function Helper({ message }) {
    /**
     * State controlling the visibility of the message bubble.
     * @type {boolean}
     */
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
}

export default Helper;
