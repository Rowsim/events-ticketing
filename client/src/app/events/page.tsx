'use client';
import { useEffect, useState } from 'react';
import EventCard from './components/EventCard';
import FilterBar from './components/FilterBar';
// import { getEvents } from '../services/api';

export default function Events() {
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const eventsRes = await fetch('/api/events')
            setEvents(await eventsRes.json())
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
                options={[...new Set(events.map(event => event.venue.location))]}
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