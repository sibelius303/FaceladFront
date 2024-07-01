import { getUser, removeUser, setUser } from "@/tools/actions";
import Billings from "@/tools/models/Billings";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.json()
    const user = await getUser()

    try {
        const data = await Billings.putPayment(formData.data, formData.user.token, formData.id)
        return new Response(JSON.stringify({
            ok: true,
            data: data
        }), {
            headers: {
                "Content-Type" : "application/json"
            },
            status: 201,
        }); 

    } catch (error) {
        console.error('Error al obtener los datos del backend interno:', error);
        return new Response(JSON.stringify({
            ok: false,
            data: error
        }), {
            headers: {
                "Content-Type" : "application/json"
            },
            status: 400,
        }); 
    }
}