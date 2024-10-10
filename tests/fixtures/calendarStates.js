

export const events = [
    {
        id: '1',
        start: new Date('2024-10-21 13:00:00'),
        end: new Date('2024-10-21 17:00:00'),
        title: 'Cumpleaños del juan',
        notes: 'Nota x',
    },
    {
        id: '2',
        start: new Date('2024-11-21 13:00:00'),
        end: new Date('2024-11-21 17:00:00'),
        title: 'Evento para el 27',
        notes: 'Nota x',
    }
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: null
}

export const calendarWithActiveEventsState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: { ...events[0] }
}
