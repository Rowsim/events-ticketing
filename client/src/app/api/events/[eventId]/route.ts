import { API_HOST } from "../../../services/api";

export async function GET(_request: Request, { params }: { params: Promise<{ eventId: string }> }) {
    try {
        return await fetch(`${API_HOST}/event/${(await params).eventId}`);
    } catch (error) {
        return new Response(null, { status: 500 })
    }
}