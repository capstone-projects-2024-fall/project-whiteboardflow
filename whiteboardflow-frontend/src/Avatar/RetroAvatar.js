// Character.js

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './RetroAvatar.css';

/**
 * Array of image paths representing each frame in the animation sequence.
 * Each path points to a frame in the "idle blink" animation.
 * @constant {string[]}
 */
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
 * A component that renders an animated avatar cycling through multiple frames,
 * simulating a blinking animation. The avatar also has a pulsing animation applied.
 *
 * @component
 * @returns {JSX.Element} An animated avatar component with blinking and pulsing effects.
 * 
 * @example
 * // Usage of the AnimatedAvatar component
 * <AnimatedAvatar />
 */
const AnimatedAvatar = () => {
    /**
     * State representing the current frame index in the animation sequence.
     * @type {number}
     */
    const [currentFrame, setCurrentFrame] = useState(0);

    /**
     * useEffect to update the current frame at set intervals.
     * This creates a loop through the frames array, cycling every 500ms.
     */
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame((prevFrame) => (prevFrame + 1) % frames.length);
        }, 500); // Adjusts the frame every 500ms for animation speed

        return () => clearInterval(interval); // Clean up interval on unmount
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

export default AnimatedAvatar;
