import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { Provider } from "react-redux";
import { act, renderHook, waitFor } from "@testing-library/react";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";

const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    });
}


describe('Pruebas en useAuthStore', () => {


    test('debe de regresar los valores por defecto', () => {

        const mockStore = getMockStore( initialState );

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider> 
        });

        expect(result.current).toEqual({
            errorMessage: undefined,
            status: 'checking',
            user: {},
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function),
        });

    });

    test('startLogin debe de realizar el login correctamente', async () => {
        localStorage.clear();

        const mockStore = getMockStore( { ...notAuthenticatedState })

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider> 
        });

        await act( async() => {

            await   result.current.startLogin( testUserCredentials );

        });

        const { errorMessage, status, user } = result.current;
        
        expect({errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: expect.any(String) }
        });

        expect( localStorage.getItem('token') ).toEqual( expect.any(String));
        expect( localStorage.getItem('token-init-date') ).toEqual( expect.any(String));
        

    });

    test('startLogin debe de fallar la autenticación', async() => { 
        localStorage.clear();
        const mockStore = getMockStore( { ...notAuthenticatedState })

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider> 
        });

        await act( async() => {
            await   result.current.startLogin( { email: 'algo@email.com', password: 'asdq23'} );
        });
    
        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Credenciales incorrectas',
            status: 'not-authenticated',
            user: {}
        });
        expect(localStorage.getItem('token')).toBe(null);
        
        await waitFor(
            () => expect( result.current.errorMessage ).toBe(undefined)
        );

    });

});