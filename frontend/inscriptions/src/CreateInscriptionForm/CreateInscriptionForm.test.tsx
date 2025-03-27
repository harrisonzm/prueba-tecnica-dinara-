import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CreateInscriptionForm from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CreateInscriptionForm', () => {
    const mockUsers = [
        { id: '1', fullName: 'John Doe' },
        { id: '2', fullName: 'Jane Smith' },
    ];

    const mockCourses = [
        { id: '1', name: 'Math 101', limit: 30, students: 10 },
        { id: '2', name: 'History 201', limit: 25, students: 20 },
    ];

    beforeEach(() => {
        mockedAxios.get.mockClear();
        mockedAxios.post.mockClear();
    });

    it('renders loading spinner initially', () => {
        render(<CreateInscriptionForm />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders form after data is fetched', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });
        mockedAxios.get.mockResolvedValueOnce({ data: mockCourses });

        render(<CreateInscriptionForm />);

        await waitFor(() => {
            expect(screen.getByText('Formulario de Inscripción')).toBeInTheDocument();
        });

        expect(screen.getByLabelText('Usuarios')).toBeInTheDocument();
        expect(screen.getByLabelText('Cursos')).toBeInTheDocument();
    });

    it('displays error alert if user is already enrolled', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });
        mockedAxios.get.mockResolvedValueOnce({ data: mockCourses });
        mockedAxios.get.mockRejectedValueOnce(new Error('User already enrolled'));

        render(<CreateInscriptionForm />);

        await waitFor(() => {
            expect(screen.getByText('Formulario de Inscripción')).toBeInTheDocument();
        });

        fireEvent.change(screen.getByLabelText('Usuarios'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Cursos'), { target: { value: '1' } });

        fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

        await waitFor(() => {
            expect(screen.getByText('EL usuario ya está Inscrito al curso')).toBeInTheDocument();
        });
    });

    it('submits form successfully if user is not enrolled', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });
        mockedAxios.get.mockResolvedValueOnce({ data: mockCourses });
        mockedAxios.get.mockRejectedValueOnce(new Error('User not enrolled'));
        mockedAxios.post.mockResolvedValueOnce({});

        render(<CreateInscriptionForm />);

        await waitFor(() => {
            expect(screen.getByText('Formulario de Inscripción')).toBeInTheDocument();
        });

        fireEvent.change(screen.getByLabelText('Usuarios'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Cursos'), { target: { value: '1' } });

        fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith(
                'http://localhost:3000/api/courses/inscriptions?idUser=1&idCourse=1'
            );
        });
    });
});
