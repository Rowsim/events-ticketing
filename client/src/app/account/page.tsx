import { cookies } from "next/headers";
import { API_HOST } from "../services/api";


const profileRes = await fetch(`${API_HOST}/auth/profile`, {
  headers: {
    'Authorization': `Bearer ${(await cookies()).get('access_token')?.value}`
  }
});
const profile = await profileRes.json();

export default async function Account() {
  const sessionEnd = new Date(profile.exp * 1000).toLocaleString();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Account</h1>
        <p className="text-lg mb-2">Signed in as {profile.username}</p>
        <p className="text-lg">Session ends at: {sessionEnd}</p>
      </div>
    </div>
  );
}