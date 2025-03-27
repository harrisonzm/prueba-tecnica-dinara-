import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CreateUserForm from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CreateUserForm', () => {
    it('renders the form with all fields', () => {
        render(<CreateUserForm />);
        expect(screen.getByText(/Create User/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/ID/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Dept. of Issue/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Place of Issue/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Ethnicity/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Personal Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Institutional Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Mobile Phone/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Landline Phone/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Birth Date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nationality/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Save User/i })).toBeInTheDocument();
    });

    it('allows the user to fill out the form', () => {
        render(<CreateUserForm />);
        const idInput = screen.getByLabelText(/ID/i);
        fireEvent.change(idInput, { target: { value: '12345' } });
        expect(idInput).toHaveValue('12345');
    });

    it('displays an error message when the user already exists', async () => {
        mockedAxios.post.mockRejectedValueOnce(new Error('User already exists'));
        render(<CreateUserForm />);
        const idInput = screen.getByLabelText(/ID/i);
        const saveButton = screen.getByRole('button', { name: /Save User/i });

        fireEvent.change(idInput, { target: { value: '12345' } });
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(screen.getByText(/El usuario con Id: 12345 ya existe/i)).toBeInTheDocument();
        });
    });

    it('submits the form successfully', async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: {} });
        const onUserCreated = jest.fn();
        render(<CreateUserForm onUserCreated={onUserCreated} />);

        const idInput = screen.getByLabelText(/ID/i);
        const saveButton = screen.getByRole('button', { name: /Save User/i });

        fireEvent.change(idInput, { target: { value: '12345' } });
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith(
                'http://localhost:3000/users/student',
                expect.objectContaining({ id: '12345' })
            );
            expect(onUserCreated).toHaveBeenCalled();
        });
    });
});
