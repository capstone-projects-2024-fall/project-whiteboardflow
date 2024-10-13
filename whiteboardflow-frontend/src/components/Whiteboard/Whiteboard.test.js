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
});