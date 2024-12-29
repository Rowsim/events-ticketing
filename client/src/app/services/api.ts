// import { cookies } from "next/headers";

export const APP_HOST = 'http://localhost:3006';
export const API_HOST = 'http://localhost:3000';

// export const getEvents = async () => {
//     const response = await fetch(`${HOST}/events`);
//     return await response.json();
// }

// export const getEvent = async (id: number) => {
//     const response = await fetch(`${HOST}/event/${id}`);
//     return await response.json();
// }

// export const createBooking = async (eventId: number, ticketIds: number[]) => {
//     const response = await fetch(`${HOST}/booking`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${(await cookies()).get('access_token')?.value}`
//         },
//         body: JSON.stringify({ eventId, ticketIds })
//     });

//     return await response.json();
// }

// export const completeBooking = async (bookingId: string) => {
//     await fetch(`${HOST}/booking/complete`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${(await cookies()).get('access_token')?.value}`
//         },
//         body: JSON.stringify({ bookingId })
//     });
// }

// export const getBookings = async () => {
//     const response = await fetch(`${HOST}/bookings`, {
//         headers: { 'Authorization': `Bearer ${(await cookies()).get('access_token')?.value}` }
//     });
//     return await response.json()
// }

// export const login = async (username: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
//     const response = await fetch(`${HOST}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//     });

//     return await response.json();
// }

// export const getProfile = async () => {
//     const response = await fetch(`${HOST}/auth/profile`, {
//         headers: { 'Authorization': `Bearer ${(await cookies()).get('access_token')?.value}` }
//     });

//     return await response.json();
// }