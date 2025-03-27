import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { UserCard } from './index';
import { User } from '../utils/user.types';
import userEvent from '@testing-library/user-event';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UserCard Component', () => {
    const mockUser: User = {
        id: '1',
        fullName: 'John Doe',
        departmentOfIssue: 'IT',
        placeOfIssue: 'New York',
        gender: 'Male',
        ethnicity: 'Caucasian',
        personalEmail: 'john.doe@example.com',
        institutionalEmail: 'johndoe@institution.com',
        mobilePhone: '1234567890',
        landlinePhone: '0987654321',
        birthDate: '1990-01-01',
        nationality: 'American',
    };

    it('renders loading state when no initial user is provided', () => {
        render(<UserCard idUser="1" />);
        expect(screen.getByText(/Cargando usuario.../i)).toBeInTheDocument();
    });

    it('renders error state when API call fails', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
        render(<UserCard idUser="1" />);
        await waitFor(() => {
            expect(screen.getByText(/Error al cargar el usuario./i)).toBeInTheDocument();
        });
    });

    it('renders user data when API call succeeds', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockUser });
        render(<UserCard idUser="1" />);
        await waitFor(() => {
            expect(screen.getByText(mockUser.fullName)).toBeInTheDocument();
            expect(screen.getByText(/Dept. of Issue:/i)).toBeInTheDocument();
            expect(screen.getByText(mockUser.departmentOfIssue)).toBeInTheDocument();
        });
    });

    it('renders user data when initial user is provided', () => {
        render(<UserCard user={mockUser} />);
        expect(screen.getByText(mockUser.fullName)).toBeInTheDocument();
        expect(screen.getByText(/Dept. of Issue:/i)).toBeInTheDocument();
        expect(screen.getByText(mockUser.departmentOfIssue)).toBeInTheDocument();
    });

    it('renders a delete button', () => {
        render(<UserCard user={mockUser} />);
        expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
    });

    it('renders a link to another page', () => {
        render(<UserCard user={mockUser} />);
        const link = screen.getByRole('link', { name: /Ir a otra página/i });
        expect(link).toHaveAttribute('href', `http://localhost:3004/users/${mockUser.id}`);
    });
});
