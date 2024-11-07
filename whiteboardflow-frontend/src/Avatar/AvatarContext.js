// AvatarContext.js
import React, { createContext, useState, useContext } from 'react';
import AnimatedAvatar from './RetroAvatar';

const AvatarContext = createContext();

export const useAvatar = () => {
    return useContext(AvatarContext);
};

export const AvatarProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(true); // You can add other states like position or animation state

    const toggleAvatar = () => setIsVisible((prev) => !prev);

    return (
        <AvatarContext.Provider value={{ isVisible, toggleAvatar }}>
            {children}
            {isVisible && <AnimatedAvatar />} {/* Renders avatar only if `isVisible` is true */}
        </AvatarContext.Provider>
    );
};
