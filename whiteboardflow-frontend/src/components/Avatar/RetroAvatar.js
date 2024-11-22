import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import './RetroAvatar.css';

const frameSequences = {
    '/results': [
        "/fat_animal_teddy/02-Walk_Happy/FA_TEDDY_Walk_Happy_000.png",
        "/fat_animal_teddy/02-Walk_Happy/FA_TEDDY_Walk_Happy_001.png",
        "/fat_animal_teddy/02-Walk_Happy/FA_TEDDY_Walk_Happy_002.png",
        "/fat_animal_teddy/02-Walk_Happy/FA_TEDDY_Walk_Happy_003.png",
        "/fat_animal_teddy/02-Walk_Happy/FA_TEDDY_Walk_Happy_004.png",
        "/fat_animal_teddy/02-Walk_Happy/FA_TEDDY_Walk_Happy_005.png",
        "/fat_animal_teddy/02-Walk_Happy/FA_TEDDY_Walk_Happy_006.png",
        "/fat_animal_teddy/02-Walk_Happy/FA_TEDDY_Walk_Happy_007.png",
        "/fat_animal_teddy/02-Walk_Happy/FA_TEDDY_Walk_Happy_008.png",
        "/fat_animal_teddy/02-Walk_Happy/FA_TEDDY_Walk_Happy_009.png",
        "/fat_animal_teddy/02-Walk_Happy/FA_TEDDY_Walk_Happy_010.png",
        "/fat_animal_teddy/02-Walk_Happy/FA_TEDDY_Walk_Happy_011.png"
        ],
    '/oraltest': [
        "/fat_animal_teddy/04-Run/FA_TEDDY_Run_000.png",
        "/fat_animal_teddy/04-Run/FA_TEDDY_Run_001.png",
        "/fat_animal_teddy/04-Run/FA_TEDDY_Run_002.png",
        "/fat_animal_teddy/04-Run/FA_TEDDY_Run_003.png",
        "/fat_animal_teddy/04-Run/FA_TEDDY_Run_004.png",
        "/fat_animal_teddy/04-Run/FA_TEDDY_Run_005.png",
        "/fat_animal_teddy/04-Run/FA_TEDDY_Run_006.png",
        "/fat_animal_teddy/04-Run/FA_TEDDY_Run_007.png",
        "/fat_animal_teddy/04-Run/FA_TEDDY_Run_008.png",
        "/fat_animal_teddy/04-Run/FA_TEDDY_Run_009.png"
    ],
    '/Settings': [
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_000.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_001.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_002.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_003.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_004.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_005.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_006.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_007.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_008.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_009.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_010.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_011.png"
    ],
    '/': [
        "/fat_animal_teddy/01-Walk/FA_TEDDY_Walk_000.png",
        "/fat_animal_teddy/01-Walk/FA_TEDDY_Walk_001.png",
        "/fat_animal_teddy/01-Walk/FA_TEDDY_Walk_002.png",
        "/fat_animal_teddy/01-Walk/FA_TEDDY_Walk_003.png",
        "/fat_animal_teddy/01-Walk/FA_TEDDY_Walk_004.png",
        "/fat_animal_teddy/01-Walk/FA_TEDDY_Walk_005.png",
        "/fat_animal_teddy/01-Walk/FA_TEDDY_Walk_006.png",
        "/fat_animal_teddy/01-Walk/FA_TEDDY_Walk_007.png",
        "/fat_animal_teddy/01-Walk/FA_TEDDY_Walk_008.png",
        "/fat_animal_teddy/01-Walk/FA_TEDDY_Walk_009.png",
        "/fat_animal_teddy/01-Walk/FA_TEDDY_Walk_010.png",
        "/fat_animal_teddy/01-Walk/FA_TEDDY_Walk_011.png"
    ],
    '/BackEndTest': [
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_000.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_001.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_002.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_003.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_004.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_005.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_006.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_007.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_008.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_009.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_010.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_011.png"
    ],
    '/whiteboard': [

        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_000.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_001.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_002.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_003.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_004.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_005.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_006.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_007.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_008.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_009.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_010.png",
        "/fat_animal_teddy/02-Idle_Blink/FA_TEDDY_Idle_Blink_011.png"
    ]
};

const AnimatedAvatar = () => {
    const location = useLocation();
    const [currentFrame, setCurrentFrame] = useState(0);

    // Get the appropriate frames for the current route
    const frames = frameSequences[location.pathname] || frameSequences['/results']; // Default to results if no match

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame((prevFrame) => (prevFrame + 1) % frames.length);
        }, 300); // Change frame every 500ms

        return () => clearInterval(interval); // Clean up on component unmount
    }, [frames]); // Update animation if frames change

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
