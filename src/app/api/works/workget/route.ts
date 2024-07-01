import Work from "@/tools/models/Works";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const user: any = await request.json()
    try {
        const data = await Work.getWork(user.token)
        return new NextResponse(JSON.stringify(data), {
            headers: {
                "Content-Type" : "application/json"
            },
            status: 200,
        }); 

    } catch (error) {
        console.error('Error al obtener los datos del backend interno:', error);
        return new NextResponse(JSON.stringify(error), {
            headers: {
                "Content-Type" : "application/json"
            },
            status: 400,
        }); 
    }
}