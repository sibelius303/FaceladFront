import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ROUTER_PATH } from './tools/constants';
import { getUser } from './tools/actions';

export async function middleware(request: NextRequest) {
    const cookieValue = getUser();
    const { url } = request;
    const { pathname } = new URL(url, `${process.env.BACK_URL}`);

    if (pathname === "/") {
        const cookieValue = getUser();
        if (cookieValue) {
            const redirectUrl = new URL(ROUTER_PATH.CLIENT, `${process.env.BACK_URL}`);
            return NextResponse.redirect(redirectUrl.toString(), { status: 303 });
        } else {
            const redirectUrl = new URL(ROUTER_PATH.LOGIN, `${process.env.BACK_URL}`);
            return NextResponse.redirect(redirectUrl.toString(), { status: 303 });
        }
    }

    if (pathname === "/client") {
        const cookieValue = getUser();
        if (!cookieValue) {
            const redirectUrl = new URL(ROUTER_PATH.LOGIN, `${process.env.BACK_URL}`);
            return NextResponse.redirect(redirectUrl.toString(), { status: 303 });
        }
    }

    if (pathname === '/works') {
        const cookieValue = getUser();
        if (!cookieValue) {
            const redirectUrl = new URL(ROUTER_PATH.LOGIN, `${process.env.BACK_URL}`);
            return NextResponse.redirect(redirectUrl.toString(), { status: 303 });
        }
    }

    if (pathname === "/login") {
        const cookieValue = getUser();
        if (cookieValue) {
            const redirectUrl = new URL(ROUTER_PATH.CLIENT, `${process.env.BACK_URL}`);
            return NextResponse.redirect(redirectUrl.toString(), { status: 303 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/client', "/login", '/works' ],
};