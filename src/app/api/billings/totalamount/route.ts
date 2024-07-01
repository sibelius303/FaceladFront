import Billings from "@/tools/models/Billings";
import Work from "@/tools/models/Works";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        console.log(data)
        const response = await Billings.getTotalAmount(data, data.user.token)
        console.log(response)
        return new NextResponse(JSON.stringify(response), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200,
        });
    } catch (error) {
        console.error('Error al obtener los datos del backend interno:', error);
        return new NextResponse(JSON.stringify(error), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 400,
        });
    }
}