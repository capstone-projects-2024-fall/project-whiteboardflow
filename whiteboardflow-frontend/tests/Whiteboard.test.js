import React from 'react';
import { render, screen } from '@testing-library/react';
import Whiteboard, { draw, erase, undo, redo } from '../src/components/Whiteboard/Whiteboard';
import '@testing-library/jest-dom';


describe('Whiteboard Component', () => {
    test('renders Whiteboard component', () => {
        render(<Whiteboard />);
        const whiteboardElement = screen.getByRole('region', { name: 'whiteboard' });
        expect(whiteboardElement).toBeInTheDocument();
    });

    test('has draw method', () => {
        expect(draw).toBeDefined();
    });

    test('has erase method', () => {
        expect(erase).toBeDefined();
    });

    test('has undo method', () => {
        expect(undo).toBeDefined();
    });

    test('has redo method', () => {
        expect(redo).toBeDefined();
    });
});
