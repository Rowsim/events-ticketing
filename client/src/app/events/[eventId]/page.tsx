'use client'
import Link from 'next/link';
import { getEvent } from '../../services/api';
import { useEffect, useState } from 'react';
import TicketBooking from '../components/TicketBooking';
import Spinner from '../components/Spinner';

export default function EventView({ params }: { params: Promise<{ eventId: number }> }) {
    const [showBooking, setShowBooking] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [event, setEvent] = useState<any | undefined>(undefined);
    const [selectedTickets, setSelectedTickets] = useState<Record<string, number[]> | undefined>(undefined);
    const inBookingProcess = showBooking || bookingSuccess;

    useEffect(() => {
        (async () => {
            setEvent(await getEvent((await params).eventId));
        })();
    }, [])

    const ticketGroups: Record<string, number> = event?.tickets.reduce((acc: { [price: number]: number }, ticket: { price: number }) => {
        acc[ticket.price] = (acc[ticket.price] || 0) + 1;
        return acc;
    }, {});


    const handleQuantityChange = (price: string, increment = true) => {
        setSelectedTickets(prevSelectedTickets => {
            const prevSelectedTicketsAtPrice = prevSelectedTickets?.[price];
            const availableTicketId = event.tickets
                .find((ticket: { id: number, price: number; }) => ticket.price === Number(price)
                    && !prevSelectedTicketsAtPrice?.includes(ticket.id))?.id;

            if (availableTicketId) {
                if (!prevSelectedTickets) {
                    return { [price]: [availableTicketId] }
                }

                if (increment) {
                    return { ...prevSelectedTickets, [price]: [...prevSelectedTickets[price] || [], availableTicketId] }
                }
            }

            if (!increment && prevSelectedTicketsAtPrice?.length) {
                return { ...prevSelectedTickets, [price]: prevSelectedTicketsAtPrice.slice(0, -1) }
            }

            return prevSelectedTickets;
        })
    }

    const handleBuyClick = () => {
        setShowBooking(true);
    };

    const handleConfirm = () => {
        setShowBooking(false);
        setBookingSuccess(true);
    };

    const handleCancel = () => {
        setShowBooking(false);
    };

    const noTicketsSelected = !selectedTickets || !Object.values(selectedTickets).flat().length;

    if (!event) {
        return <Spinner />;
    }

    return (
        <div className="container mx-auto p-8">
            <Link href="/events">
                <span className="text-blue-500 hover:underline text-lg">Back to Events</span>
            </Link>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-6 flex flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                    <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover" />
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <h1 className="text-4xl font-bold mb-1">{event.name}</h1>
                    <p className="text-gray-600 text-lg mb-6">{new Date(event.date).toUTCString()}</p>
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-4">Tickets</h2>
                        <ul className='mb-4'>
                            {Object.entries(ticketGroups).map(([price, ticketCount]) => (
                                <li key={price} className="flex justify-between items-center mt-4">
                                    <span className="text-lg font-mono">{ticketCount} tickets available at £{price}</span>
                                    <div className="flex items-center justify-between border border-gray-100 rounded h-8 w-22">
                                        <button
                                            onClick={() => handleQuantityChange(price, false)}
                                            className={`bg-blue-500 text-white px-2 py-1 rounded-l font-semibold ${inBookingProcess || !selectedTickets?.[price]?.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={inBookingProcess || !selectedTickets?.[price]?.length}
                                        >
                                            -
                                        </button>
                                        <span className="min-w-8 pl-1 pr-1 text-center font-mono">
                                            {selectedTickets?.[price]?.length || 0}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(price, true)}
                                            className={`bg-blue-500 text-white px-2 py-1 rounded-r font-semibold ${inBookingProcess || ticketCount === (selectedTickets?.[price]?.length || 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={inBookingProcess || ticketCount === (selectedTickets?.[price]?.length || 0)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {bookingSuccess ? (<div className="flex items-center justify-center flex-col">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <p className='text-green-600 text-lg font-semibold flex justify-between mb-1'>Booking successful!</p>
                            <Link href="/bookings">
                                <span className="text-blue-500 underline hover:opacity-50">My Bookings</span>
                            </Link>
                        </div>
                        ) :
                            !showBooking ?
                                (<button
                                    onClick={handleBuyClick}
                                    disabled={noTicketsSelected}
                                    className={`bg-blue-500 mt-24 text-white w-full font-semibold px-6 py-2 rounded hover:bg-blue-600 ${noTicketsSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Purchase tickets
                                </button>)
                                : (
                                    <div className="items-center justify-center">
                                        <TicketBooking
                                            tickets={selectedTickets}
                                            eventId={event.id}
                                            onConfirm={handleConfirm}
                                            onCancel={handleCancel}
                                        />
                                    </div>
                                )}
                    </div>
                </div>
            </div>
        </div>
    );
}
