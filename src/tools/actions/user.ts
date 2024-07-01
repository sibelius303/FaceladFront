import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';
import { COOKIE_NAME } from '../constants';

export const setUser = (user: any, expires: number = 0): void => {
    cookies().set(
        COOKIE_NAME.USER,
        JSON.stringify(user),
        {
            expires: expires ? expires : Date.now() + 1000 * 60 * 60 * 24 * 30
        }
    );
};

export const getUser = (): any | false => {
    const userCookie = cookies().get(COOKIE_NAME.USER);
    return userCookie?.value ? JSON.parse(userCookie.value) : false;
};

export const removeUser = (): boolean => {
    cookies().delete(COOKIE_NAME.USER);
    return true;
};