import { cookies } from "next/headers";
import { API_HOST } from "../../services/api";

export async function GET() {
    try {
        console.debug('GET EVENTS', API_HOST)
        return await fetch(`${API_HOST}/events`);
    } catch (error) {
        console.debug('get events error', error)
        return new Response(null, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const eventRequest = await req.json()
        return await fetch(`${API_HOST}/event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${(await cookies()).get('access_token')?.value}`
            },
            body: JSON.stringify(eventRequest)
        });
    } catch (error) {
        return new Response(null, { status: 401 })
    }
}
