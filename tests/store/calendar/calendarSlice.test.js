import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventsState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

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

    test('onDeleteEvent debe de borrar el evento activo', () => {
        
        const state = calendarSlice.reducer( calendarWithActiveEventsState, onDeleteEvent());

        expect( state.events ).not.toContain([ events[0] ]);
        expect( state.activeEvent ).toBe( null );
    });

    test('onLoadEvents debe de establecer los eventos', () => {
        // initialState

        const state = calendarSlice.reducer( initialState, onLoadEvents(events) );

        expect( state.isLoadingEvents ).toBeFalsy();
        expect( state.events ).toEqual(events);

    });

    test('onLogoutCalendar debe de limpiar el estado', () => {
        //calendarWithActiveEventsState 

        const state = calendarSlice.reducer( calendarWithActiveEventsState, onLogoutCalendar() );

        expect( state ).toEqual(initialState);

    });




});