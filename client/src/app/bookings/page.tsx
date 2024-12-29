import { cookies } from 'next/headers';
import { API_HOST } from '../services/api';
import BookingCard from '../components/BookingCard';

const bookingsRes = await fetch(`${API_HOST}/bookings`, {
    headers: {
        'Authorization': `Bearer ${(await cookies()).get('access_token')?.value}`
    }
});
const bookings: any[] = await bookingsRes.json()

export default async function Bookings() {
    return (
        <div className="container mx-auto p-8">
            {!bookings.length ? <p>No bookings found</p> : (
                <>
                    <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
                    <div className="space-y-6">
                        {bookings.map(booking => (
                            <BookingCard key={booking.id} booking={booking} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}