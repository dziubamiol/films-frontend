import { render, fireEvent, getByText, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import store from '../../store';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import App from '../../App';
import { Provider } from 'react-redux';
import React from 'react';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import Index from './Index';

describe ('Render routes', () => {

    it ('Index route', () => {
        const {container} = render(<Index/>);
        expect(container.innerHTML).toMatch(/Search/);
    });

    it ('Login route', async () => {
        const {container} = render(<Index/>);
        const user: HTMLButtonElement | null = container.querySelector('[name=user]');
        fireEvent.click(user as any);

        fireEvent.click(screen.getByText('Login'));

        expect(screen.getByText(/Create user or/)).toBeInTheDocument();
    });

});

export default null;
