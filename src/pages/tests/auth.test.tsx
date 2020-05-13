import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Index from './Index';
import nock from 'nock';


describe('Auth page', () => {
    it('Invalid input values', async () => {
        const {container} = render(<Index/>);
        const user: HTMLButtonElement | null = container.querySelector('[name=user]');
        fireEvent.click(user as any);

        const butt = screen.getByText('Login');
        fireEvent.click(butt);

        fireEvent.click(screen.getByText('Sign in').parentNode as Element);


        expect(screen.getAllByText(/Username is required/).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Password is required/).length).toBeGreaterThan(0);
    });
    
    // not possible to perform because CORS
 /*   it('User exists', async () => {
        nock('http://test.com')
            .defaultReplyHeaders({'Access-Control-Allow-Origin': '*'})
            .defaultReplyHeaders({'Access-Control-Allow-Credentials': 'true'})
            .post('/user/join/')
            .reply(304);

        nock('http://test.com')
            .defaultReplyHeaders({'Access-Control-Allow-Origin': '*'})
            .defaultReplyHeaders({'Access-Control-Allow-Credentials': 'true'})
            .get('/films')
            .query(true)
            .reply(404);

        const {container} = render(<Index/>);
        const user: HTMLButtonElement | null = container.querySelector('[name=user]');
        fireEvent.click(user as any);

        const butt = screen.getByText('Login');
        fireEvent.click(butt);

        const username: any = container.querySelector('[name=username]');
        const password: any = container.querySelector('[name=password]');

        fireEvent.change(username, {target: {value: 'user'}});
        fireEvent.change(password, {target: {value: 'user123123123'}});

        fireEvent.click(screen.getByText('Sign in').parentNode as Element);
        expect(screen.getByText(/This username already exists/)).toBeInTheDocument();
    });*/
});
