import { NextResponse } from 'next/server';
import { NextRequest as NextRequestType } from 'next/server';

const SIGNOUT_PATH = "/signout"
const GUARDED_PATHS = ["/bookings", "/account"]

export async function middleware(req: NextRequestType) {
    if (req.nextUrl.pathname.includes(SIGNOUT_PATH)) {
        let response: NextResponse = NextResponse.redirect(new URL('/auth/login', req.url));
        response.cookies.delete('access_token');
        return response;
    }

    if (GUARDED_PATHS.some(path => req.nextUrl.pathname.includes(path))) {
        const token = req.cookies.get('access_token');
        if (!token) {
            return NextResponse.redirect(new URL('/auth/login', req.url));
        }
        // check if token is valid
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/((?!api|static|.*\\..*|_next).*)",
};