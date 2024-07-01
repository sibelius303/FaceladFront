import { getUser, removeUser, setUser } from "@/tools/actions";
import Task from "@/tools/models/Task";
import Work from "@/tools/models/Works";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.json()
    const user = getUser()
    console.log("soy el formData", formData)
    console.log("soy el user", user.token)
    try {
        const data = await Task.postFinishedTask(user.token, formData.id, formData.data)
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
