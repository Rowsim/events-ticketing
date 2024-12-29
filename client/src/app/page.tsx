import Link from "next/link";

//TODO build search capability

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Sign in to manage/book events</h1>
        <p className="text-gray-600 mb-8">Your one-stop solution for booking event tickets.</p>
        <div className="space-x-4">
          <Link href='/auth/login'>
            <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-28">Login</button>
          </Link>
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 w-28">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
