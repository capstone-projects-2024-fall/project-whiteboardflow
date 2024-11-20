// AvatarContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedAvatar from './RetroAvatar';
import './AvatarContext.css';

const AvatarContext = createContext();

export const useAvatar = () => useContext(AvatarContext);

export const AvatarProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [showHint, setShowHint] = useState(false);
    const [clicked, setClicked] = useState(false); // New state for click animation
    const location = useLocation();

    const toggleAvatar = () => setIsVisible((prev) => !prev);
    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 1000); // Reset after animation duration
    };

    useEffect(() => {
        setShowHint(true);
    }, [location.pathname]);

    return (
        <AvatarContext.Provider value={{ isVisible, toggleAvatar }}>
            {children}
            {isVisible && (
                <div className="avatar-fixed-container" onClick={handleClick}>
                    <AnimatedAvatar clicked={clicked} />
                    {showHint && (
                        <div className="hint-bubble">
                            <p>{location.pathname === '/results' ? "Here are your results!" : "Welcome to Whiteboard Assistant"}</p>
                        </div>
                    )}
                </div>
            )}
        </AvatarContext.Provider>
    );
};
