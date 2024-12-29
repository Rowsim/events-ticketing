'use client';
import { useState } from 'react';
import VenueCreation from './components/VenueCreation';
import EventCreation from './components/EventCreation';

export default function Management() {
    const [activeTab, setActiveTab] = useState('event');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

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
                <EventCreation />
            )}

            {activeTab === 'venue' && (
                <VenueCreation />
            )}
        </div>
    );
}