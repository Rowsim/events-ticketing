'use client'
import { FormEvent } from "react";
import { redirect } from 'next/navigation'

export default function Login() {

    const handleCreateTestUser = async () => {
        try {
          const response = await fetch('/api/login/test-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: 'Testuser', password: 'password' }),
            });

            if (response.ok) {
                alert('Test user created, username: Testuser, password: password1')
            }
        } catch (e) {
          console.error(e)
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const username = formData.get('username')
        const password = formData.get('password')
        if (!username || !password) return
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })

        if (response.ok) {
            redirect('/account')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="username"
                            placeholder="Test-user"
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            autoComplete="current-password"
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>

                    <button onClick={handleCreateTestUser} type='button' className="w-full bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
                         Create test user
                     </button>
                </form>

            </div>
        </div>
    );
}
