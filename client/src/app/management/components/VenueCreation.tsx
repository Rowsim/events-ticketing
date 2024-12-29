'use client';
import Link from "next/link";
import { useState } from "react";

export default function VenueCreation() {
    const [creatingVenue, setCreatingVenue] = useState(false);
    const [createdVenueId, setCreatedVenueId] = useState<string | undefined>();

    const handleVenueSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setCreatedVenueId(undefined);
            setCreatingVenue(true);
            const formData = new FormData(event.currentTarget);
            const name = formData.get('venueName') as string;
            const location = formData.get('venueLocation') as string;
            const imageUrl = formData.get('venueImageUrl') as string;

            const response = await fetch('/api/venues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, location, imageUrl }),
            });

            if (response.ok) {
                setCreatedVenueId((await response.json()).id);
            } else {
                alert('Failed to create event.');
            }
        } catch (e) {
            console.error(e);
        }
        setCreatingVenue(false);
    }

    const handleReset = () => {
        setCreatedVenueId(undefined);
    }

    return (
        <>
            {createdVenueId ? (
                <div className="flex items-center justify-center flex-col">
                    <div className='flex items-center justify-center mb-4'>
                        <h2 className='text-green-600 font-semibold flex justify-between text-lg'>Venue created</h2>
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

                    <Link href={`/venues/${createdVenueId}`}>
                        <span className='text-gray-600 line-through cursor-not-allowed'>View venue</span>
                    </Link>

                    <button onClick={handleReset} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">
                        Create Another Venue
                    </button>
                </div>
            ) :
                <form onSubmit={handleVenueSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="venueName" className="block text-gray-700">Venue Name</label>
                        <input
                            type="text"
                            name="venueName"
                            id="venueName"
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="venueLocation" className="block text-gray-700">Venue Location</label>
                        <input
                            type="text"
                            name="venueLocation"
                            id="venueLocation"
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="venueImageUrl" className="block text-gray-700">Image URL</label>
                        <input
                            type="text"
                            name="venueImageUrl"
                            id="venueImageUrl"
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${creatingVenue ? 'opacity-50 bg-gray-600 cursor-not-allowed hover:bg-gray-600' : ''}`}
                        disabled={creatingVenue}
                    >
                        {creatingVenue ?
                            <div className="flex items-center justify-center h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-400"></div>
                            </div> : 'Create Venue'
                        }
                    </button>
                </form>
            }</>
    );
}