import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Whiteboard from './Whiteboard';

// Mock the HelpButton component to avoid testing its implementation here
jest.mock('./HelpButton', () => () => <button>Help</button>);

// Set up mocks and spies before each test
beforeEach(() => {
    jest.clearAllMocks();

    // Mock the global fetch function to return a resolved promise with mock server data
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ serverData: 'someData' }),
    });

    // Mock the window.iink.Editor class and its methods
    window.iink = {
        Editor: jest.fn().mockImplementation(() => ({
            initialize: jest.fn().mockResolvedValue(), // Mock initialize method
            resize: jest.fn(),                         // Mock resize method
            destroy: jest.fn(),                        // Mock destroy method
        })),
    };

    // Spy on addEventListener and removeEventListener to monitor their calls
    jest.spyOn(window, 'addEventListener');
    jest.spyOn(window, 'removeEventListener');
});

describe('Whiteboard component', () => {
    test('renders without crashing', () => {
        // Render the Whiteboard component
        const { getByText } = render(<Whiteboard />);
        // Verify that the Help button is present in the document
        expect(getByText('Help')).toBeInTheDocument();
    });

    test('fetches server configuration correctly', async () => {
        // Render the Whiteboard component
        render(<Whiteboard />);
        // Wait for fetch to be called once
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        // Check that fetch was called with the correct URL
        await waitFor(() => expect(fetch).toHaveBeenCalledWith("server-configuration.json"));
    });

    test('initializes the editor with the fetched configuration', async () => {
        // Render the Whiteboard component
        render(<Whiteboard />);
        // Wait for fetch to complete
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        // Verify fetch was called with the correct endpoint
        expect(fetch).toHaveBeenCalledWith('server-configuration.json');
        // Wait for the Editor constructor to be called
        await waitFor(() => expect(window.iink.Editor).toHaveBeenCalledTimes(1));
        // Check that Editor was instantiated with correct arguments
        expect(window.iink.Editor).toHaveBeenCalledWith(
            expect.any(HTMLElement), // The editor DOM element reference
            expect.objectContaining({
                configuration: expect.objectContaining({
                    offscreen: true,
                    server: { serverData: 'someData' }, // The mocked server data
                    rendering: {
                        minHeight: 2000,
                        minWidth: 2000,
                    },
                    modules: {
                        eraser: true,
                        transcript: true,
                    },
                }),
            })
        );
        // Access the editor instance from the mock
        const editorInstance = window.iink.Editor.mock.results[0].value;
        // Wait for the editor's initialize method to be called
        await waitFor(() => expect(editorInstance.initialize).toHaveBeenCalledTimes(1));
    });

    test('attaches resize event listener on mount', async () => {
        // Render the Whiteboard component
        render(<Whiteboard />);
        // Wait for addEventListener to be called with 'resize' event
        await waitFor(() => expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function)));
    });

    test('cleans up by removing resize event listener and destroying the editor on unmount', async () => {
        // Render the Whiteboard component and get the unmount function
        const { unmount } = render(<Whiteboard />);
        // Wait for the Editor constructor to be called
        await waitFor(() => expect(window.iink.Editor).toHaveBeenCalledTimes(1));
        // Access the editor instance from the mock
        const editorInstance = window.iink.Editor.mock.results[0].value;
        // Unmount the component to trigger cleanup
        unmount();
        // Verify that removeEventListener was called with 'resize' event
        expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
        // Check that the editor's destroy method was called
        expect(editorInstance.destroy).toHaveBeenCalledTimes(1);
    });
});
