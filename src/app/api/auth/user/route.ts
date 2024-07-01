import { removeUser, setUser } from "@/tools/actions";
import { LOGIN, LOGOUT, REGISTER, ROUTER_PATH } from "@/tools/constants";
import User from "@/tools/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const form = await request.formData();
    if (form.get('action') === LOGIN) {
        const username = form.get('username');
        const password = form.get('password');
        const data = await User.login(username as string, password as string);
        if (!data || data.detail || data.error) {
            const url = new URL(ROUTER_PATH.LOGIN, request.url);
            return NextResponse.redirect(url, { status: 303 });
        }
        setUser(data);
        const url = new URL(ROUTER_PATH.CLIENT, request.url);
        return NextResponse.redirect(url, { status: 303 });

    } else if (form.get('action') === REGISTER) {
        const email = form.get('username') as string
        const username = form.get('username') as string
        const password = form.get('password') as string
        const data = await User.register(username, password, email);
        if (data.user) {
            setUser(data);
            const url = new URL(ROUTER_PATH.CLIENT, request.url);
            return NextResponse.redirect(url, { status: 303 });
        } else {
            return NextResponse.json({ error: "Error recibido por la API", message: data.username }, { status: 500 });
        }
    } else if (form.get('action') === LOGOUT) {
        removeUser();
        const url = new URL(ROUTER_PATH.LOGIN, request.url);
        return NextResponse.redirect(url, { status: 303 });
    }
    return NextResponse.json({
        message: 'working'
    });
}

export async function GET(): Promise<NextResponse> {
    // const user = await User.get()
    return NextResponse.json("user");
}
