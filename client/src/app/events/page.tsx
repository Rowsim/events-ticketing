'use client';
import { useEffect, useState } from 'react';
import EventCard from './components/EventCard';
import FilterBar from './components/FilterBar';
import { getEvents } from '../services/api';

const eventsData = [
    {
        id: 5,
        name: "test event tuesday",
        date: "2024-12-16T17:32:18.229Z",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
        venue: {
            id: "489d4da1-89d1-4209-a3aa-d0e4dce741c7",
            name: "Albert Hall",
            location: "Manchester"
        }
    },
    {
        id: 6,
        name: "Band A",
        date: "2024-12-28T20:20:34.759Z",
        imageUrl: "https://imagedelivery.net/WS9ABFRS6TfdqDudkFOT3w/grrraphic/previews/festival-crowds-2210x1474.jpg/public",
        venue: {
            id: "489d4da1-89d1-4209-a3aa-d0e4dce741c7",
            name: "Albert Hall",
            location: "Manchester"
        }
    },
    {
        id: 5,
        name: "test event tuesday",
        date: "2024-12-16T17:32:18.229Z",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
        venue: {
            id: "489d4da1-89d1-4209-a3aa-d0e4dce741c7",
            name: "Albert Hall",
            location: "Manchester"
        }
    },
    {
        id: 6,
        name: "Band A",
        date: "2024-12-28T20:20:34.759Z",
        imageUrl: "https://imagedelivery.net/WS9ABFRS6TfdqDudkFOT3w/grrraphic/previews/festival-crowds-2210x1474.jpg/public",
        venue: {
            id: "489d4da1-89d1-4209-a3aa-d0e4dce741c7",
            name: "Albert Hall",
            location: "Manchester"
        }
    },
    {
        id: 5,
        name: "test event tuesday",
        date: "2024-12-16T17:32:18.229Z",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
        venue: {
            id: "489d4da1-89d1-4209-a3aa-d0e4dce741c7",
            name: "Albert Hall",
            location: "Manchester"
        }
    },
    {
        id: 6,
        name: "Band A",
        date: "2024-12-28T20:20:34.759Z",
        imageUrl: "https://imagedelivery.net/WS9ABFRS6TfdqDudkFOT3w/grrraphic/previews/festival-crowds-2210x1474.jpg/public",
        venue: {
            id: "489d4da1-89d1-4209-a3aa-d0e4dce741c7",
            name: "Albert Hall",
            location: "Manchester"
        }
    },
    {
        id: 5,
        name: "test event tuesday",
        date: "2024-12-16T17:32:18.229Z",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
        venue: {
            id: "489d4da1-89d1-4209-a3aa-d0e4dce741c7",
            name: "Albert Hall",
            location: "Manchester"
        }
    },
    {
        id: 6,
        name: "Band A",
        date: "2024-12-28T20:20:34.759Z",
        imageUrl: "https://imagedelivery.net/WS9ABFRS6TfdqDudkFOT3w/grrraphic/previews/festival-crowds-2210x1474.jpg/public",
        venue: {
            id: "489d4da1-89d1-4209-a3aa-d0e4dce741c7",
            name: "Albert Hall",
            location: "Manchester"
        }
    },
    {
        id: 5,
        name: "test event tuesday",
        date: "2024-12-16T17:32:18.229Z",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
        venue: {
            id: "489d4da1-89d1-4209-a3aa-d0e4dce741c7",
            name: "Albert Hall",
            location: "Manchester"
        }
    },
    {
        id: 6,
        name: "Band A",
        date: "2024-12-28T20:20:34.759Z",
        imageUrl: "https://imagedelivery.net/WS9ABFRS6TfdqDudkFOT3w/grrraphic/previews/festival-crowds-2210x1474.jpg/public",
        venue: {
            id: "489d4da1-89d1-4209-a3aa-d0e4dce741c7",
            name: "Albert Hall",
            location: "Manchester"
        }
    }
];

export default function Events() {
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            setEvents(await getEvents())
        })()
    }, [])

    const filteredEvents = events.filter(event => {
        return (
            event.name.toLowerCase().includes(search.toLowerCase()) &&
            (location === '' || event.venue.location === location)
        );
    });

    return (
        <div className="container mx-auto p-4">
            <FilterBar
                search={search}
                location={location}
                options={[...new Set(eventsData.map(event => event.venue.location))]}
                onSearchChange={(e) => setSearch(e.target.value)}
                onLocationChange={(e) => setLocation(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-8 gap-4">
                {filteredEvents.map(event => (
                    <EventCard
                        key={event.id}
                        eventId={event.id}
                        name={event.name}
                        date={event.date}
                        imageUrl={event.imageUrl}
                        venue={event.venue}
                    />
                ))}
            </div>
        </div>
    );
}