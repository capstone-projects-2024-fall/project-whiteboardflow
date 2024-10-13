import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Whiteboard from '../src/components/Whiteboard/Whiteboard';
import { act } from 'react';


// Mock fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ mockServerData: true })
    })
);

// Mock iink editor
const mockInitialize = jest.fn();
const mockDestroy = jest.fn();
global.window.iink = {
    Editor: jest.fn(() => ({
        initialize: mockInitialize,
        destroy: mockDestroy,
        resize: jest.fn(),
    })),
};

describe('Whiteboard Component', () => {
    beforeEach(() => {
        fetch.mockClear();
        mockInitialize.mockClear();
        mockDestroy.mockClear();
    });

    test('renders Whiteboard component', () => {
        render(<Whiteboard />);
        const whiteboardElement = screen.getByTestId('editor'); // Or use `getByRole` if accessible
        expect(whiteboardElement).toBeInTheDocument();
    });


    test('fetches server configuration on mount', async () => {
        render(<Whiteboard />);
        expect(fetch).toHaveBeenCalledWith('server-configuration.json');
        await screen.findByTestId('editor');
        expect(mockInitialize).toHaveBeenCalled();
    });

/*     test('cleans up on unmount', () => {
        const { unmount } = render(<Whiteboard />);
        unmount();
        expect(mockDestroy).toHaveBeenCalled();
    }); */
});
