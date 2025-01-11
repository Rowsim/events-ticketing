import { API_HOST } from '../../../services/api'

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json()
        await fetch(`${API_HOST}/auth/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })

        return new Response(null, {
            status: 201
        })
    } catch (error) {
        console.error(error)
        return new Response(null, { status: 401 })
    }
}