'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Management() {
    const [activeTab, setActiveTab] = useState('event');
    const [tickets, setTickets] = useState([{ price: '', quantity: '' }]);
    const [creatingEvent, setCreatingEvent] = useState(false);
    const [createdEventId, setCreatedEventId] = useState<string | undefined>();

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleEventSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setCreatedEventId(undefined);
            setCreatingEvent(true);
            const formData = new FormData(event.currentTarget);
            const name = formData.get('name') as string;
            const dateTimestamp = new Date(formData.get('date') as string).getTime();
            const venueId = formData.get('venueId') as string;
            const imageUrl = formData.get('imageUrl') as string;
            const ticketsToGenerate = tickets.reduce((acc, ticket, index) => {
                const priceFromForm = formData.get(`ticketPrice${index}`) as string;
                const price = Number(priceFromForm).toFixed(2);
                const quantity = Number(formData.get(`ticketQuantity${index}`));
                if (price && quantity) {
                    acc[price] = quantity;
                }
                return acc;
            }, {} as Record<string, number>);

            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, dateTimestamp, venueId, imageUrl, ticketsToGenerate }),
            });

            if (response.ok) {
                setCreatedEventId((await response.json()).id);
                alert('Event created successfully!');
            } else {
                alert('Failed to create event.');
            }
        } catch (e) {
            console.error(e);
        }
        setCreatingEvent(false);
    };

    const handleAddTicket = () => {
        setTickets([...tickets, { price: '', quantity: '' }]);
    };

    const handleDeleteTicket = (index: number) => {
        setTickets(tickets.filter((_, i) => i !== index));
    };

    const handleReset = () => {
        setTickets([{ price: '', quantity: '' }]);
        setCreatedEventId(undefined);
    }

    return (
        <div className="container mx-auto p-8">
            <div className="relative flex justify-center mb-8">
                <div className="absolute inset-0 flex">
                    <div
                        className={`w-1/2 h-full bg-blue-500 rounded transition-transform duration-300 ${activeTab === 'event' ? 'transform translate-x-0' : 'transform translate-x-full'
                            }`}
                    ></div>
                </div>
                <button
                    onClick={() => handleTabClick('event')}
                    className={`relative z-10 w-1/2 px-4 py-2 rounded-l ${activeTab === 'event' ? 'text-white' : 'text-gray-700'
                        }`}
                >
                    Create Event
                </button>
                <button
                    onClick={() => handleTabClick('venue')}
                    className={`relative z-10 w-1/2 px-4 py-2 rounded-r ${activeTab === 'venue' ? 'text-white' : 'text-gray-700'
                        }`}
                >
                    Create Venue
                </button>
            </div>

            {activeTab === 'event' && (
                <>
                    {!!createdEventId ? (
                        <div className="flex items-center justify-center flex-col">
                            <div className='flex items-center justify-center mb-4'>
                                <h2 className='text-green-600 font-semibold flex justify-between text-lg'>Event created</h2>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-green-600"
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
                            </div>

                            <Link href={`/events/${createdEventId}`}>
                                <span className='text-blue-500 underline hover:opacity-50 text-lg'>View event</span>
                            </Link>

                            <button onClick={handleReset} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">
                                Create Another Event
                            </button>
                        </div>) :
                        <form onSubmit={handleEventSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700">Event Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="date" className="block text-gray-700">Event Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="venueId" className="block text-gray-700">Venue ID</label>
                                <input
                                    type="text"
                                    name="venueId"
                                    id="venueId"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="imageUrl" className="block text-gray-700">Image URL</label>
                                <input
                                    type="text"
                                    name="imageUrl"
                                    id="imageUrl"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Tickets</h3>
                                {tickets.map((ticket, index) => (
                                    <div key={index} className="flex space-x-2 mb-2 items-center">
                                        <div className="flex-1">
                                            <label htmlFor={`ticketPrice${index}`} className="block text-gray-700">Price</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                min={0}
                                                max={9999}
                                                name={`ticketPrice${index}`}
                                                id={`ticketPrice${index}`}
                                                required
                                                className="w-full p-1 border border-gray-300 rounded mt-1"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label htmlFor={`ticketQuantity${index}`} className="block text-gray-700">Quantity</label>
                                            <input
                                                type="number"
                                                name={`ticketQuantity${index}`}
                                                id={`ticketQuantity${index}`}
                                                required
                                                className="w-full p-1 border border-gray-300 rounded mt-1"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteTicket(index)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mt-6"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddTicket}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    + Add Ticket
                                </button>
                            </div>
                            <button
                                type="submit"
                                className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${creatingEvent ? 'opacity-50 bg-gray-600 cursor-not-allowed hover:bg-gray-600' : ''}`}
                                disabled={creatingEvent}
                            >
                                {creatingEvent ?
                                    <div className="flex items-center justify-center h-full">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-400"></div>
                                    </div> : 'Create Event'
                                }
                            </button>
                        </form>
                    }
                </>
            )}

            {activeTab === 'venue' && (
                <div>
                    <p>Venue creation form will be here.</p>
                </div>
            )}
        </div>
    );
}