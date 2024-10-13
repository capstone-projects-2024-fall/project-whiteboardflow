import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Whiteboard from './Whiteboard';
import HelpButton from './HelpButton';
import '@testing-library/jest-dom';

// Mocks for external dependencies
jest.mock('./HelpButton', () => () => <button>Help</button>);
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
);
window.iink = {
    Editor: jest.fn().mockImplementation(() => ({
        initialize: jest.fn().mockResolvedValue(true),
        resize: jest.fn(),
        destroy: jest.fn(),
    })),
};
describe('Whiteboard component tests', () => {
    beforeEach(() => {
        fetch.mockClear();
        window.iink.Editor.mockClear();
    });

    test('renders Whiteboard and HelpButton without crashing', () => {
        render(<Whiteboard/>);
        expect(screen.getByText('Help')).toBeInTheDocument();
    });

    test('fetches server configuration and initializes editor on mount', async () => {
        render(<Whiteboard />);
        await waitFor(() => expect(fetch).toHaveBeenCalled());
        expect(fetch).toHaveBeenCalledWith("server-configuration.json");
        await waitFor(() => expect(window.iink.Editor).toHaveBeenCalledTimes(1));
    });

    test('attaches and detaches resize event listener correctly', () => {
        const addSpy = jest.spyOn(window, 'addEventListener');
        const removeSpy = jest.spyOn(window, 'removeEventListener');
        const { unmount } = render(<Whiteboard />);
        expect(addSpy).toHaveBeenCalledWith('resize', expect.any(Function));
        unmount();
        expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    });


});