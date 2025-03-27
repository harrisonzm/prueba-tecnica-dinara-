import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
    test('renders navigation links', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/Users/i)).toBeInTheDocument();
        expect(screen.getByText(/Courses/i)).toBeInTheDocument();
        expect(screen.getByText(/Inscriptions/i)).toBeInTheDocument();
    });

    test('renders Home page by default', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        expect(screen.getByText(/Home SPA/i)).toBeInTheDocument();
    });

    test('renders fallback loading text for lazy-loaded components', async () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });
});
