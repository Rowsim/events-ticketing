import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Sign in to manage/book events</h1>
          <Link href='/auth/login'>
            <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-32 mb-2">Login</button>
          </Link>
      </div>
    </div>
  );
}
