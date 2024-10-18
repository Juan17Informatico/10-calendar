import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice";



describe("Pruebas en uiSlice", () => {
    
    test("debe de regresar el estado pro defecto ", () => {

        expect(uiSlice.getInitialState().isDateModalOpen ).toBeFalsy();

    });

    test('debe e cambiar el isDateModalOpen correctamente', () => {
        
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(state, onOpenDateModal());
        expect(state.isDateModalOpen).toBeTruthy();

        state = uiSlice.reducer(state, onCloseDateModal());
        expect( state.isDateModalOpen ).toBeFalsy();

    });

});