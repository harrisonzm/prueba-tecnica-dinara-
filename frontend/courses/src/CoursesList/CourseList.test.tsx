import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import CoursesList from './index';
import { Course } from '../utils/courses.types';
import userEvent from '@testing-library/user-event';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CoursesList Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading spinner initially', () => {
        render(<CoursesList />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('fetches and displays courses when no idUser is provided', async () => {
        const mockCourses: Course[] = [
            { id: '1', name: 'Course 1', description: 'Description 1' },
            { id: '2', name: 'Course 2', description: 'Description 2' },
        ];
        mockedAxios.get.mockResolvedValueOnce({ data: mockCourses });

        render(<CoursesList />);

        await waitFor(() => {
            expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/courses/');
        });

        expect(screen.getByText('Course 1')).toBeInTheDocument();
        expect(screen.getByText('Course 2')).toBeInTheDocument();
    });

    it('fetches and displays user-specific courses when idUser is provided', async () => {
        const mockInscriptions = [
            { idUser: '123', idCourse: '1' },
            { idUser: '123', idCourse: '2' },
        ];
        const mockCourses: Course[] = [
            { id: '1', name: 'Course 1', description: 'Description 1' },
            { id: '2', name: 'Course 2', description: 'Description 2' },
        ];

        mockedAxios.get
            .mockResolvedValueOnce({ data: mockInscriptions }) // Fetch inscriptions
            .mockResolvedValueOnce({ data: mockCourses[0] }) // Fetch course 1
            .mockResolvedValueOnce({ data: mockCourses[1] }); // Fetch course 2

        render(<CoursesList idUser="123" />);

        await waitFor(() => {
            expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/courses/inscriptions?idUser=123');
        });

        expect(screen.getByText('Course 1')).toBeInTheDocument();
        expect(screen.getByText('Course 2')).toBeInTheDocument();
    });

    it('renders CreateCourseForm when no idUser is provided', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [] });

        render(<CoursesList />);

        await waitFor(() => {
            expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/courses/');
        });

        expect(screen.getByText('Courses')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create course/i })).toBeInTheDocument();
    });

    it('handles API errors gracefully', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

        render(<CoursesList />);

        await waitFor(() => {
            expect(mockedAxios.get).toHaveBeenCalled();
        });

        expect(screen.queryByText('Courses')).not.toBeInTheDocument();
    });
});
