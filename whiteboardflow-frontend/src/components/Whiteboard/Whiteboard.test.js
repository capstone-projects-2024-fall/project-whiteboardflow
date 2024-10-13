import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Whiteboard from './Whiteboard';

jest.mock('./HelpButton', () => () => <button>Help</button>);

beforeEach(() => {
    jest.clearAllMocks();

    // Mock fetch to return a resolved promise with server configuration
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ serverData: 'someData' }),
    });

    // Mock the iink.Editor class
    window.iink = {
        Editor: jest.fn().mockImplementation(() => ({
            initialize: jest.fn().mockResolvedValue(),
            resize: jest.fn(),
            destroy: jest.fn(),
        })),
    };

    // Spy on addEventListener and removeEventListener
    jest.spyOn(window, 'addEventListener');
    jest.spyOn(window, 'removeEventListener');
});


describe('Whiteboard component', () => {
    test('renders without crashing', () => {
        const { getByText } = render(<Whiteboard />);
        expect(getByText('Help')).toBeInTheDocument();
    });

    test('fetches server configuration correctly', async () => {
        render(<Whiteboard />);
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(fetch).toHaveBeenCalledWith("server-configuration.json"));
    });

    test('initializes the editor with the fetched configuration', async () => {
        render(<Whiteboard />);
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        expect(fetch).toHaveBeenCalledWith('server-configuration.json');
        await waitFor(() => expect(window.iink.Editor).toHaveBeenCalledTimes(1));
        expect(window.iink.Editor).toHaveBeenCalledWith(
            expect.any(HTMLElement), // The editor DOM element
            expect.objectContaining({
                configuration: expect.objectContaining({
                    offscreen: true,
                    server: { serverData: 'someData' },
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
        const editorInstance = window.iink.Editor.mock.results[0].value;
        await waitFor(() => expect(editorInstance.initialize).toHaveBeenCalledTimes(1));
    });


    test('attaches resize event listener on mount', async () => {
        jest.spyOn(window, 'addEventListener').mockImplementation(() => {});
        render(<Whiteboard />);
        await waitFor(() => expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function)));
    });

    test('cleans up by removing resize event listener and destroying the editor on unmount', async () => {
        const { unmount } = render(<Whiteboard />);
        await waitFor(() => expect(window.iink.Editor).toHaveBeenCalledTimes(1));
        const editorInstance = window.iink.Editor.mock.results[0].value;
        unmount();
        expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
        expect(editorInstance.destroy).toHaveBeenCalledTimes(1);
    });


});
