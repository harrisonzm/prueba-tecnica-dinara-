import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import UsersList from "./index";
import { User } from "../utils/user.types";
import userEvent from "@testing-library/user-event";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("UsersList Component", () => {
    const mockUsers: User[] = [
        {
            id: "1",
            fullName: "John Doe",
            departmentOfIssue: "IT",
            placeOfIssue: "New York",
            gender: "Male",
            ethnicity: "Caucasian",
            personalEmail: "john.doe@example.com",
            institutionalEmail: "johndoe@institution.com",
            mobilePhone: "1234567890",
            landlinePhone: "0987654321",
            birthDate: "1990-01-01",
            nationality: "American",
        },
        {
            id: "2",
            fullName: "Jane Smith",
            departmentOfIssue: "HR",
            placeOfIssue: "Los Angeles",
            gender: "Female",
            ethnicity: "Hispanic",
            personalEmail: "jane.smith@example.com",
            institutionalEmail: "janesmith@institution.com",
            mobilePhone: "9876543210",
            landlinePhone: "0123456789",
            birthDate: "1985-05-15",
            nationality: "American",
        },
    ];

    beforeEach(() => {
        mockedAxios.get.mockResolvedValue({ data: mockUsers });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the UsersList component and fetches users", async () => {
        render(<UsersList />);

        expect(screen.getByText(/User List/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(mockedAxios.get).toHaveBeenCalledWith(
                "http://localhost:3000/api/users/student/"
            );
        });

        mockUsers.forEach((user) => {
            expect(screen.getByText(user.fullName)).toBeInTheDocument();
        });
    });

    it("renders the CreateUserForm component", () => {
        render(<UsersList />);

        expect(screen.getByText(/Create User/i)).toBeInTheDocument();
    });

    it("handles API errors gracefully", async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

        render(<UsersList />);

        await waitFor(() => {
            expect(mockedAxios.get).toHaveBeenCalled();
        });

        expect(screen.queryByText(mockUsers[0].fullName)).not.toBeInTheDocument();
        expect(screen.queryByText(mockUsers[1].fullName)).not.toBeInTheDocument();
    });

    it("updates the user list when a new user is created", async () => {
        render(<UsersList />);

        await waitFor(() => {
            expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        });

        const newUser: User = {
            id: "3",
            fullName: "Alice Johnson",
            departmentOfIssue: "Finance",
            placeOfIssue: "Chicago",
            gender: "Female",
            ethnicity: "Asian",
            personalEmail: "alice.johnson@example.com",
            institutionalEmail: "alicejohnson@institution.com",
            mobilePhone: "5555555555",
            landlinePhone: "4444444444",
            birthDate: "1995-07-20",
            nationality: "American",
        };

        mockedAxios.get.mockResolvedValueOnce({ data: [...mockUsers, newUser] });

        const createUserButton = screen.getByText(/Create User/i);
        userEvent.click(createUserButton);

        await waitFor(() => {
            expect(mockedAxios.get).toHaveBeenCalledTimes(2);
        });

        expect(screen.getByText(newUser.fullName)).toBeInTheDocument();
    });
});
