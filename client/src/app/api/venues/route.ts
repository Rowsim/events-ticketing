import { cookies } from "next/headers";
import { API_HOST } from "../../services/api";

export async function POST(req: Request) {
    try {
        return await fetch(`${API_HOST}/venues`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${(await cookies()).get('access_token')?.value}`
            },
            body: JSON.stringify(await req.json())
        });
    } catch (error) {
        return new Response(null, { status: 401 })
    }
}
