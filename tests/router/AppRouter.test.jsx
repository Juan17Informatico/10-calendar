import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../src/router/AppRouter";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";

jest.mock('../../src/hooks/useAuthStore');
jest.mock('../../src/calendar', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}));


describe('Pruebas en <AppRouter />', () => {

    const mockCheckAuthTokenMock = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('debe de mostrar la pantalla de carga en y llamar checkAuthToken', () => {

        useAuthStore.mockReturnValue({
            status: 'cheking',
            checkAuthToken: mockCheckAuthTokenMock
        });

        render( <AppRouter /> );

        expect(screen.getByText('Cargando...')).toBeTruthy();
        expect(mockCheckAuthTokenMock).toHaveBeenCalled();

    });

    test('debe de mostrar el login en caso de no estar autenticado', () => {

        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthTokenMock
        });

        const { container } = render( 
            <MemoryRouter initialEntries={['/auth/']} >
                <AppRouter /> 
            </MemoryRouter>
        );

        expect( screen.getByText('Ingreso')).toBeTruthy();
        expect( container ).toMatchSnapshot();

    });

    test('debe de mostrar el login calendario si estamos autenticados', () => {

        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthTokenMock
        });

        render( 
            <MemoryRouter>
                <AppRouter /> 
            </MemoryRouter>
        );

        expect( screen.getByText('CalendarPage')).toBeTruthy();
        // expect( container ).toMatchSnapshot();

    });

});