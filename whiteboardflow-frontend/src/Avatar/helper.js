import React from 'react';
import { motion } from 'framer-motion';

const message = () => {
    return (
        <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{
                duration: 0.5,
                yoyo: Infinity, // Makes it "pulse"
            }}
            className="retro-avatar"
        >
            <img src="/path/to/pixel-art-avatar.png" alt="Retro Helper" />
        </motion.div>
    );
};

export default message;
