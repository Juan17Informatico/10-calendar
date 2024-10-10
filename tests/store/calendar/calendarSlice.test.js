import { calendarSlice, onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('Pruebas en calendarSlice', () => {

    test('should debe de regresar el estado por defecto', () => {

        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState );

    });

    test('onSetActiveEvent debe de activar el evento', () => {

        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );

        expect( state.activeEvent ).toEqual( events[0] ); 
        

    });

    test('onAddNewEvent debe de agregar el evento', () => {

        const newEvent = {
            id: '3',
            start: new Date('2025-10-21 13:00:00'),
            end: new Date('2025-10-21 17:00:00'),
            title: 'Cumpleaños del Pablo',
            notes: 'Nota y',
        }

        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent(newEvent) );

        expect( state.events ).toEqual([ ...events, newEvent ]);
        

    });

    test('onUpdateEvent debe de actualizar el evento', () => {

        const updatedEvent = {
            id: '1',
            start: new Date('2027-10-21 13:00:00'),
            end: new Date('2027-10-21 17:00:00'),
            title: 'Cumpleaños del campuzano',
            notes: 'Nota actualizada',
        }

        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent(updatedEvent) );

        expect( state.events ).toContain(updatedEvent);
        

    });



});