import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './RetroAvatar.css';

/** @type {string[]} Paths for each animation frame */
const frames = [
    "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_000.png",
    "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_002.png",
    "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_003.png",
    "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_004.png",
    "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_005.png",
    "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_006.png",
    "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_007.png",
    "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_008.png",
    "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_009.png"
];

/**
 * An animated avatar component that cycles through a series of frames to simulate a blinking effect.
 * The avatar also has a pulsing effect applied.
 * @returns {JSX.Element} The animated avatar component.
 */
const RetroAvatar = () => {
    const [currentFrame, setCurrentFrame] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame((prevFrame) => (prevFrame + 1) % frames.length);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1.05 }}
            transition={{
                duration: 2,
                yoyo: Infinity,
            }}
            className="retro-avatar"
        >
            <img src={frames[currentFrame]} alt="Animated Helper" />
        </motion.div>
    );
};

export default RetroAvatar;
