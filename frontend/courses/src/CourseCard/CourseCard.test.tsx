import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import CourseCard from './index';
import { Course } from '../utils/courses.types';
import CreateCourseForm from '../CreateCourseForm';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CourseCard Component', () => {
    const mockCourse: Course = {
        id: '1',
        name: 'Test Course',
        limit: 30,
        students: 25,
    };

    const mockOnUpdated = jest.fn();

    it('renders course details correctly', () => {
        render(<CourseCard course={mockCourse} onUpdated={mockOnUpdated} />);

        expect(screen.getByText('Test Course')).toBeInTheDocument();
        expect(screen.getByText(/ID:/)).toHaveTextContent('ID: 1');
        expect(screen.getByText(/Limit:/)).toHaveTextContent('Limit: 30');
        expect(screen.getByText(/Students:/)).toHaveTextContent('Students: 25');
    });

    it('opens the edit dialog when "Edit" button is clicked', () => {
        render(<CourseCard course={mockCourse} onUpdated={mockOnUpdated} />);

        fireEvent.click(screen.getByText('Edit'));
        expect(screen.getByText('Edit Course Limit')).toBeInTheDocument();
    });

    it('closes the edit dialog when "Cancel" button is clicked', () => {
        render(<CourseCard course={mockCourse} onUpdated={mockOnUpdated} />);

        fireEvent.click(screen.getByText('Edit'));
        fireEvent.click(screen.getByText('Cancel'));
        expect(screen.queryByText('Edit Course Limit')).not.toBeInTheDocument();
    });

    it('updates the limit value when input is changed', () => {
        render(<CourseCard course={mockCourse} onUpdated={mockOnUpdated} />);

        fireEvent.click(screen.getByText('Edit'));
        const input = screen.getByLabelText('Limit') as HTMLInputElement;
        fireEvent.change(input, { target: { value: '40' } });
        expect(input.value).toBe('40');
    });

    it('sends a PATCH request and calls onUpdated when "Editar" button is clicked', async () => {
        mockedAxios.patch.mockResolvedValueOnce({});
        render(<CourseCard course={mockCourse} onUpdated={mockOnUpdated} />);

        fireEvent.click(screen.getByText('Edit'));
        const input = screen.getByLabelText('Limit') as HTMLInputElement;
        fireEvent.change(input, { target: { value: '40' } });
        fireEvent.click(screen.getByText('Editar'));

        await waitFor(() => {
            expect(mockedAxios.patch).toHaveBeenCalledWith(
                'http://localhost:3000/api/courses/1',
                { limit: 40 }
            );
            expect(mockOnUpdated).toHaveBeenCalled();
        });
    });

    it('displays "Updating..." while the save request is in progress', async () => {
        mockedAxios.patch.mockImplementation(
            () => new Promise((resolve) => setTimeout(resolve, 100))
        );
        render(<CourseCard course={mockCourse} onUpdated={mockOnUpdated} />);

        fireEvent.click(screen.getByText('Edit'));
        fireEvent.click(screen.getByText('Editar'));

        expect(screen.getByText('Updating...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText('Updating...')).not.toBeInTheDocument();
        });
    });

    it('handles errors gracefully when the save request fails', async () => {
        console.error = jest.fn(); // Mock console.error to suppress error logs
        mockedAxios.patch.mockRejectedValueOnce(new Error('Network Error'));
        render(<CourseCard course={mockCourse} onUpdated={mockOnUpdated} />);

        fireEvent.click(screen.getByText('Edit'));
        fireEvent.click(screen.getByText('Editar'));

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith(
                'Error updating course limit:',
                expect.any(Error)
            );
        });
    });
    it('disables the "Editar" button while the update is in progress', async () => {
      mockedAxios.patch.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );
      render(<CourseCard course={mockCourse} onUpdated={mockOnUpdated} />);

      fireEvent.click(screen.getByText('Edit'));
      fireEvent.click(screen.getByText('Editar'));

      const editButton = screen.getByText('Editar') as HTMLButtonElement;
      expect(editButton).toBeDisabled();

      await waitFor(() => {
        expect(editButton).not.toBeDisabled();
      });
    });

    it('resets the limit value when the dialog is closed without saving', () => {
      render(<CourseCard course={mockCourse} onUpdated={mockOnUpdated} />);

      fireEvent.click(screen.getByText('Edit'));
      const input = screen.getByLabelText('Limit') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '40' } });
      fireEvent.click(screen.getByText('Cancel'));

      fireEvent.click(screen.getByText('Edit'));
      expect(input.value).toBe('30'); // Original limit value
    });

    it('does not call onUpdated if the save request fails', async () => {
      mockedAxios.patch.mockRejectedValueOnce(new Error('Network Error'));
      render(<CourseCard course={mockCourse} onUpdated={mockOnUpdated} />);

      fireEvent.click(screen.getByText('Edit'));
      fireEvent.change(screen.getByLabelText('Limit'), { target: { value: '40' } });
      fireEvent.click(screen.getByText('Editar'));

      await waitFor(() => {
        expect(mockOnUpdated).not.toHaveBeenCalled();
      });
    });

    it('does not open the dialog if the "Edit" button is not clicked', () => {
      render(<CourseCard course={mockCourse} onUpdated={mockOnUpdated} />);
      expect(screen.queryByText('Edit Course Limit')).not.toBeInTheDocument();
    });

    it('renders the correct initial limit value in the input field', () => {
      render(<CourseCard course={mockCourse} onUpdated={mockOnUpdated} />);

      fireEvent.click(screen.getByText('Edit'));
      const input = screen.getByLabelText('Limit') as HTMLInputElement;
      expect(input.value).toBe('30'); // Initial limit value
    });




});
