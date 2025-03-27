import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { InscriptionCard } from '../InscriptionCard';
import { Inscription } from '../utils/index.types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('InscriptionCard', () => {
    const mockInscription: Inscription = {
        idUser: '123',
        idCourse: '456',
    };

    it('renders the inscription details', () => {
        render(<InscriptionCard inscription={mockInscription} />);

        expect(screen.getByText(/User Id:123/i)).toBeInTheDocument();
        expect(screen.getByText(/Course Id: 456/i)).toBeInTheDocument();
    });

    it('calls the delete API and triggers onDeleted callback when DELETE button is clicked', async () => {
        const onDeletedMock = jest.fn();
        mockedAxios.delete.mockResolvedValueOnce({});

        render(<InscriptionCard inscription={mockInscription} onDeleted={onDeletedMock} />);

        const deleteButton = screen.getByText(/DELETE/i);
        fireEvent.click(deleteButton);

        expect(mockedAxios.delete).toHaveBeenCalledWith(
            'http://localhost:3000/api/courses/inscriptions/?idUser=123&idCourse=456'
        );

        await waitFor(() => {
            expect(onDeletedMock).toHaveBeenCalled();
        });
    });

    it('handles API errors gracefully', async () => {
        mockedAxios.delete.mockRejectedValueOnce(new Error('API Error'));

        render(<InscriptionCard inscription={mockInscription} />);

        const deleteButton = screen.getByText(/DELETE/i);
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(mockedAxios.delete).toHaveBeenCalled();
        });

        // Ensure no crash or unexpected behavior
        expect(screen.getByText(/User Id:123/i)).toBeInTheDocument();
    });
});
