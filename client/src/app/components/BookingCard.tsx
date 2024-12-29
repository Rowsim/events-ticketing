import Link from "next/link";

interface BookingCardProps {
    booking: {
        id: string;
        event: {
            id: number;
            name: string;
            date: string;
            imageUrl: string;
        };
        tickets: {
            id: number;
            price: number;
        }[];
    };
}

export default function BookingCard({ booking }: BookingCardProps) {
    const ticketGroups = booking.tickets.reduce((acc: { [price: number]: number }, ticket) => {
        acc[ticket.price] = (acc[ticket.price] || 0) + 1;
        return acc;
    }, {});

    return (
        <Link href={`/events/${booking.event.id}`}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4 flex flex-col md:flex-row group hover:shadow-lg transition-shadow duration-300">
                <img src={booking.event.imageUrl} alt={booking.event.name} className="w-full md:w-1/3 h-64 object-cover" />
                <div className="p-4 flex-grow">
                    <h2 className="text-xl font-bold text-blue-500 group-hover:underline">{booking.event.name}</h2>
                    <p className="text-gray-600">{new Date(booking.event.date).toLocaleDateString()}</p>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Tickets</h3>
                        <ul>
                            {Object.entries(ticketGroups).map(([price, count]) => (
                                <li key={price} className="text-gray-600 font-mono">
                                    {count} tickets at £{price}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Link>
    );
}