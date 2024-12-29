import { cookies } from "next/headers";
import { API_HOST } from "../../../services/api";

export async function GET() {
    try {
        return await fetch(`${API_HOST}/venues/list`, {
            headers: {
                'Authorization': `Bearer ${(await cookies()).get('access_token')?.value}`
            }
        });
    } catch (error) {
        return new Response(null, { status: 500 })
    }
}