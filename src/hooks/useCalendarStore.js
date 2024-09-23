import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";



export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const {
        events,
        activeEvent
    } = useSelector(  state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) ); 
    }
    
    const startSavingEvent = async( calendarEvent ) => {
        // TODO: update event

        //* Todo bien
        if(calendarEvent._id){
            // Actualizando
            dispatch( onUpdateEvent( { ...calendarEvent } ) ); 
        }else{
            // Creando
            const { data } = await calendarApi.post('/events', calendarEvent );
            console.log(data);
            dispatch( onAddNewEvent({...calendarEvent, id: data.evento.id, user }) )
        }
    }

    const startDeletingEvent = async() => {
        // TODO: llegar al backend
        dispatch( onDeleteEvent() );
    }

    const startLoadingEvents = async() => {

        try {
            
            const { data } = await calendarApi.get('/events');
            
            const events =  convertEventsToDateEvents(data.eventos);

            console.log( { events }); 

        } catch (error) {
            console.log('Error cargando eventos');
            console.error(error);
            
        }

    }

    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* Métodos
        setActiveEvent, 
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }

}
