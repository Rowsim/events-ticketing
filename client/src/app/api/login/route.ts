import { API_HOST } from '../../services/api'

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json()
        const loginResponse = await (await fetch(`${API_HOST}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })).json();
        const { access_token } = loginResponse;
        if (!access_token) throw new Error('Bad access token')

        return new Response(null, {
            status: 200, headers: {
                'Set-Cookie': `access_token=${access_token}; Path=/; HttpOnly; SameSite=Strict`
            }
        })
    } catch (error) {
        return new Response(null, { status: 401 })
    }
}