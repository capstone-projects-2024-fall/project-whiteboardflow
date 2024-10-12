import { render, screen } from '@testing-library/react';
import Whiteboard from '../src/components/Whiteboard/Whiteboard';

describe('Whiteboard Component', () => {
    test('renders Whiteboard component', () => {
        render(<Whiteboard />);
        const whiteboardElement = screen.getByRole('region', { name: 'whiteboard' });
        expect(whiteboardElement).toBeInTheDocument();
    });

    // Placeholder for testing draw functionality
    test('has draw method', () => {
        const whiteboard = Whiteboard();
        expect(whiteboard.draw).toBeDefined();
    });

    // Placeholder for testing erase functionality
    test('has erase method', () => {
        const whiteboard = Whiteboard();
        expect(whiteboard.erase).toBeDefined();
    });

    // Placeholder for testing undo functionality
    test('has undo method', () => {
        const whiteboard = Whiteboard();
        expect(whiteboard.undo).toBeDefined();
    });

    // Placeholder for testing redo functionality
    test('has redo method', () => {
        const whiteboard = Whiteboard();
        expect(whiteboard.redo).toBeDefined();
    });
});
