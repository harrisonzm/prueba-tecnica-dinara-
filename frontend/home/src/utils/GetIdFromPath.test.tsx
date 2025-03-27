import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import GetIdFromPath from "./GetIdFromPath";

describe("GetIdFromPath", () => {
    it("should pass the id from the URL to its children as a prop", () => {
        const TestComponent = ({ idUser }: { idUser?: string }) => (
            <div data-testid="child">{idUser}</div>
        );

        const { getByTestId } = render(
            <MemoryRouter initialEntries={["/user/123"]}>
                <Route path="/user/:id">
                    <GetIdFromPath>
                        <TestComponent />
                    </GetIdFromPath>
                </Route>
            </MemoryRouter>
        );

        expect(getByTestId("child").textContent).toBe("123");
    });

    it("should render children without modification if they are not valid React elements", () => {
        const { container } = render(
            <MemoryRouter initialEntries={["/user/123"]}>
                <Route path="/user/:id">
                    <GetIdFromPath>
                        <>Plain Text</>
                    </GetIdFromPath>
                </Route>
            </MemoryRouter>
        );

        expect(container.textContent).toBe("Plain Text");
    });

    it("should handle cases where no id is present in the URL", () => {
        const TestComponent = ({ idUser }: { idUser?: string }) => (
            <div data-testid="child">{idUser || "No ID"}</div>
        );

        const { getByTestId } = render(
            <MemoryRouter initialEntries={["/user/"]}>
                <Route path="/user/:id?">
                    <GetIdFromPath>
                        <TestComponent />
                    </GetIdFromPath>
                </Route>
            </MemoryRouter>
        );

        expect(getByTestId("child").textContent).toBe("No ID");
    });
});
