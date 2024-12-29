'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
    const pathname = usePathname()

    const linkClasses = (path: string) =>
        pathname?.startsWith(path)
            ? 'text-white font-semibold'
            : 'text-gray-300 hover:text-white transition duration-300 cursor-pointer';

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const token = e.target.value;
        if (!token) return;
        localStorage.setItem('authToken', token);
    };

    return (
        <nav className="bg-gray-900 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold flex items-center space-x-2">
                    <svg width="36px" height="36px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M938.666667 426.666667v-149.333334c0-46.933333-38.4-85.333333-85.333334-85.333333h-117.333333c0 17.066667-14.933333 32-32 32s-32-14.933333-32-32H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v149.333334c46.933333 0 85.333333 38.4 85.333334 85.333333s-38.4 85.333333-85.333334 85.333333v149.333334c0 46.933333 38.4 85.333333 85.333334 85.333333h501.333333c0-17.066667 14.933333-32 32-32s32 14.933333 32 32H853.333333c46.933333 0 85.333333-38.4 85.333334-85.333333v-149.333334c-46.933333 0-85.333333-38.4-85.333334-85.333333s38.4-85.333333 85.333334-85.333333zM704 757.333333c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32 32 14.933333 32 32-14.933333 32-32 32z m0-106.666666c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32 32 14.933333 32 32-14.933333 32-32 32z m0-106.666667c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32 32 14.933333 32 32-14.933333 32-32 32z m0-106.666667c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32 32 14.933333 32 32-14.933333 32-32 32z m0-106.666666c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32 32 14.933333 32 32-14.933333 32-32 32z" fill="#FFA726" /></svg>
                    <span>Ticketing App</span>
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Temp auth token"
                        className="bg-gray-800 text-white p-2 rounded w-full"
                        onBlur={handleBlur}
                    />
                </div>

                <div className="space-x-6">
                    <Link href="/events">
                        <span className={linkClasses('/events')}>Events</span>
                    </Link>
                    <Link href="/bookings">
                        <span className={linkClasses('/bookings')}>Bookings</span>
                    </Link>
                    <Link href="/account">
                        <span className={linkClasses('/account')}>Account</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}