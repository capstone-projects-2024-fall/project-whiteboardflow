import React from 'react';

/** Draws on the whiteboard. */
export const draw = () => { };

/** Erases part of the whiteboard. */
export const erase = () => { };

/** Undoes the last action on the whiteboard. */
export const undo = () => { };

/** Redoes the last undone action on the whiteboard. */
export const redo = () => { };

/**
 * Whiteboard available for the user during a written test.
 * @component
 */
const Whiteboard = () => {
  return (
    <div role="region" aria-label="whiteboard">
      {/* Whiteboard content */}
    </div>
  );
};

export default Whiteboard;
