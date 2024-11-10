// AvatarToggleButton.js

import React from 'react';
import { Switch } from '@mui/material';
import { useAvatar } from './AvatarContext';

/**
 * A toggle button component to control the visibility of the avatar.
 * Utilizes the AvatarContext for visibility state and toggling functionality.
 *
 * @component
 * @returns {JSX.Element} A switch component that toggles avatar visibility.
 * 
 * @example
 * // Use this component within the AvatarProvider to control avatar visibility
 * import AvatarToggleButton from './AvatarToggleButton';
 * 
 * function App() {
 *   return (
 *     <AvatarProvider>
 *       <AvatarToggleButton />
 *     </AvatarProvider>
 *   );
 * }
 */
const AvatarToggleButton = () => {
    // Access avatar visibility and toggle function from context
    const { isVisible, toggleAvatar } = useAvatar();

    return (
        <Switch checked={isVisible} onChange={toggleAvatar} color="default" />
    );
};

export default AvatarToggleButton;
