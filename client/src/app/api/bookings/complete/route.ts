import { cookies } from "next/headers";
import { API_HOST } from "../../../services/api";

export async function POST(req: Request) {
    try {
        const { bookingId } = await req.json()

        return await fetch(`${API_HOST}/booking/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${(await cookies()).get('access_token')?.value}`
            },
            body: JSON.stringify({ bookingId })
        });
    } catch (error) {
        return new Response(null, { status: 401 })
    }
}