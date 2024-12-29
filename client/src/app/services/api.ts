const HOST = 'http://localhost:3000';

export const getEvents = async () => {
    const response = await fetch(`${HOST}/events`);
    return await response.json();
}

export const getEvent = async (id: number) => {
    const response = await fetch(`${HOST}/event/${id}`);
    return await response.json();
}

export const createBooking = async (eventId: number, ticketIds: number[]) => {
    const response = await fetch(`${HOST}/booking`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ eventId, ticketIds })
    });

    return await response.json();
}

export const completeBooking = async (bookingId: string) => {
    await fetch(`${HOST}/booking/complete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ bookingId })
    });
}

export const getBookings = async () => {
    const response = await fetch(`${HOST}/bookings`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
    });
    return await response.json()
}