import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedAvatar from './RetroAvatar';
import './AvatarContext.css';

/**
 * @typedef {Object} AvatarContextProps
 * @property {boolean} isVisible - Whether the avatar is visible.
 * @property {Function} toggleAvatar - Function to toggle the avatar's visibility.
 */

/** @type {React.Context<AvatarContextProps | undefined>} */
const AvatarContext = createContext(undefined);

/**
 * Custom hook to access the AvatarContext.
 * @returns {AvatarContextProps} The avatar context value with `isVisible` and `toggleAvatar`.
 * @throws Will throw an error if used outside of an AvatarProvider.
 */
export const useAvatar = () => {
    const context = useContext(AvatarContext);
    if (!context) {
        throw new Error("useAvatar must be used within an AvatarProvider");
    }
    return context;
};

/**
 * Provides avatar context to child components, enabling visibility management and hint messages based on the route.
 * @param {Object} props
 * @param {React.ReactNode} props.children - The child components wrapped by the provider.
 * @returns {JSX.Element} The provider component with avatar visibility functionality.
 */
export const AvatarProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [showHint, setShowHint] = useState(false);
    const location = useLocation();

    /**
     * Gets the hint message based on the current route path.
     * @returns {string} The hint message.
     */
    const getHintMessage = () => {
        switch (location.pathname) {
            case '/':
                return "Welcome to the Whiteboard Assistant!";
            case '/OralTest':
                return "Get ready for the oral test!";
            case '/Settings':
                return "Adjust your preferences here.";
            case '/BackEndTest':
                return "This is where you can test the backend.";
            case '/results':
                return "Here are your results!\nGood Job!";
            case '/whiteboard':
                return "Use the whiteboard for brainstorming.";
            default:
                return "Hello! Need any help?";
        }
    };

    const toggleAvatar = () => setIsVisible((prev) => !prev);
    const toggleHint = () => setShowHint((prev) => !prev);

    useEffect(() => {
        setShowHint(true);
    }, [location.pathname]);

    return (
        <AvatarContext.Provider value={{ isVisible, toggleAvatar }}>
            {children}
            {isVisible && (
                <div className="avatar-fixed-container" onClick={toggleHint}>
                    <AnimatedAvatar />
                    {showHint && (
                        <div className="hint-bubble">
                            <p>{getHintMessage()}</p>
                        </div>
                    )}
                </div>
            )}
        </AvatarContext.Provider>
    );
};
