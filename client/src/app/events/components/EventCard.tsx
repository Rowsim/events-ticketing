import Link from "next/link";

interface EventCardProps {
    eventId: number;
    name: string;
    date: string;
    imageUrl: string;
    venue: {
        name: string;
        location: string;
    };
}

export default function EventCard({ eventId, name, imageUrl, date, venue }: EventCardProps) {
    return (
        <Link href={`/events/${eventId}`}>
            <div className="block bg-white cursor-pointer shadow-md rounded-lg overflow-hidden transform transition-transform duration-150 hover:scale-105">
                <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h2 className="text-xl font-bold">{name}</h2>
                    <p className="text-gray-600">{new Date(date).toLocaleDateString()}</p>
                    <p className="text-gray-600">{venue.name}, {venue.location}</p>
                </div>
            </div>
        </Link>
    );
}