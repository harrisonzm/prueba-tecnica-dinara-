import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import CreateCourseForm from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CreateCourseForm', () => {
    const mockOnCourseCreated = jest.fn();

    beforeEach(() => {
        mockedAxios.post.mockClear();
        mockOnCourseCreated.mockClear();
    });

    it('renders the form correctly', () => {
        render(<CreateCourseForm onCourseCreated={mockOnCourseCreated} />);

        expect(screen.getByLabelText(/ID/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Course Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Limit/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Save Course/i })).toBeInTheDocument();
    });

    it('updates form fields on input change', () => {
        render(<CreateCourseForm onCourseCreated={mockOnCourseCreated} />);

        const idInput = screen.getByLabelText(/ID/i);
        const nameInput = screen.getByLabelText(/Course Name/i);
        const limitInput = screen.getByLabelText(/Limit/i);

        fireEvent.change(idInput, { target: { value: '123' } });
        fireEvent.change(nameInput, { target: { value: 'Math 101' } });
        fireEvent.change(limitInput, { target: { value: '30' } });

        expect(idInput).toHaveValue('123');
        expect(nameInput).toHaveValue('Math 101');
        expect(limitInput).toHaveValue('30');
    });

    it('submits the form and calls onCourseCreated on success', async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: {} });

        render(<CreateCourseForm onCourseCreated={mockOnCourseCreated} />);

        const idInput = screen.getByLabelText(/ID/i);
        const nameInput = screen.getByLabelText(/Course Name/i);
        const limitInput = screen.getByLabelText(/Limit/i);
        const submitButton = screen.getByRole('button', { name: /Save Course/i });

        fireEvent.change(idInput, { target: { value: '123' } });
        fireEvent.change(nameInput, { target: { value: 'Math 101' } });
        fireEvent.change(limitInput, { target: { value: '30' } });

        fireEvent.click(submitButton);

        expect(mockedAxios.post).toHaveBeenCalledWith(
            'http://localhost:3000/api/courses/',
            { id: '123', name: 'Math 101', limit: '30' }
        );

        await screen.findByText(/Create Course/i); // Wait for re-render
        expect(mockOnCourseCreated).toHaveBeenCalled();
    });

    it('shows an error if the submission fails', async () => {
        mockedAxios.post.mockRejectedValueOnce(new Error('Submission failed'));

        render(<CreateCourseForm onCourseCreated={mockOnCourseCreated} />);

        const idInput = screen.getByLabelText(/ID/i);
        const nameInput = screen.getByLabelText(/Course Name/i);
        const limitInput = screen.getByLabelText(/Limit/i);
        const submitButton = screen.getByRole('button', { name: /Save Course/i });

        fireEvent.change(idInput, { target: { value: '123' } });
        fireEvent.change(nameInput, { target: { value: 'Math 101' } });
        fireEvent.change(limitInput, { target: { value: '30' } });

        fireEvent.click(submitButton);

        expect(mockedAxios.post).toHaveBeenCalledWith(
            'http://localhost:3000/api/courses/',
            { id: '123', name: 'Math 101', limit: '30' }
        );

        await screen.findByText(/Create Course/i); // Wait for re-render
        expect(mockOnCourseCreated).not.toHaveBeenCalled();
    });
});
