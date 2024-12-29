import { API_HOST } from "../../services/api";

export async function GET() {
    try {
        return await fetch(`${API_HOST}/events`);
    } catch (error) {
        return new Response(null, { status: 500 })
    }
}