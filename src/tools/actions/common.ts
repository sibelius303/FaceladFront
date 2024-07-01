"use server";
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";


export const setError = (message:string) => {
    const expires = Date.now() + 15 * 1000;
    cookies().set(
        process.env.COOKIE_NAME_ERROR as string,
        message,
        {
            expires: expires
        }
    );
}

export const getError = () => {
    const message = cookies().get( process.env.COOKIE_NAME_ERROR as string );
    return message?.value ?? false;
}

export const CreateResponse = (redirectPath: string, redirectUrl: string ) => {
    const response = redirectPath ? NextResponse.redirect( new URL(redirectPath as string, redirectUrl) ) : NextResponse.next()
    return response
}