'use client'
import { useState } from "react";
import { completeBooking, createBooking } from "../../services/api";

interface TicketBookingProps {
    tickets: Record<string, number[]> | undefined;
    eventId: number;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function TicketBooking({ tickets, eventId, onConfirm, onCancel }: TicketBookingProps) {
    const [creatingBooking, setCreatingBooking] = useState(false);

    const totalPrice = Object.entries(tickets || {}).reduce((acc, [price, ticketIds]) => {
        return acc + Number(price) * ticketIds.length;
    }, 0);

    const handleConfirm = async () => {
        if (!tickets) return
        setCreatingBooking(true);
        try {
            const createBookingResponse = await createBooking(eventId, Object.values(tickets).flat());
            await completeBooking(createBookingResponse.bookingId);
            setCreatingBooking(false);
        } catch (e) {
            console.error(e);
            return;
        } finally {
            setCreatingBooking(false);
        }

        onConfirm();
    };

    return (
        <>
            <h2 className="text-2xl font-semibold mb-4">Buy Tickets</h2>
            <p className="text-lg mb-4 font-mono">Total ticket price: £{totalPrice}</p>
            <div className="flex justify-between">
                <button
                    onClick={onCancel}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Cancel
                </button>
                <button
                    onClick={handleConfirm}
                    disabled={creatingBooking}
                    className={`bg-blue-500 text-white px-4 py-2 rounded h-12 w-36 hover:bg-blue-600 font-semibold ${creatingBooking ? 'opacity-50 bg-gray-600 cursor-not-allowed hover:bg-gray-600' : ''}`}
                >
                    {creatingBooking ?
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
                        </div> : 'Confirm'}
                </button>
            </div>
        </>
    );
}