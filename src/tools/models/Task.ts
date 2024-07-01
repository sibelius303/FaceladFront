// const urlBase: string = 
// const tokenBase: string = 

interface WorkData {
    id: number,
    title: string,
    description: string,
    assigned_to: string,
    status: boolean,
    is_active: boolean,
    is_deleted: boolean,
    created_at: string,
    updated_at: string,
    work_id: number
    }

export default class Task {
    static async postTask(obj: WorkData, token: string): Promise<any | null> {
        console.log(obj)
        console.log(token)
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}tasks/`, {
                method: 'POST',
                headers,
                body: JSON.stringify(
                    obj
                )
            });
            return await response.json();
        } catch(error: any) {
            console.log("soy el error de tareas",error)
            return null;
        }
    }

    static async getUniqueTak(token: string, id: number): Promise<any | null> {
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}tasks/${id}`, {
                method: 'GET',
                headers,
            });
            return await response.json();
        } catch(error: any) {
            return null;
        }
    }

    static async postFinishedTask(token: string, id: number, obj:WorkData): Promise<any | null> {
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}tasks/finished/${id}/`, {
                method: 'POST',
                headers,
                // body: JSON.stringify(
                //     {}
                // )
            });
            console.log(response.body)
            return response.status

        } catch(error: any) {
            console.log(error)
            return null;
        }
    }

    static async deletedTask(token: string, id: number): Promise<any | null> {
        console.log("entreeee", token)
        console.log("soy el id", id)
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}tasks/${id}`, {
                method: 'DELETE',
                headers,
            });
            return await response.json();
        } catch(error: any) {
            return null;
        }
    }

    static async putTask(obj:any, token: string, id: string): Promise<any | null> {
        console.log("entreeee", token)
        console.log("soy el id", id)
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}tasks/${id}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify(
                    obj
                )
            });
            return await response.json();
        } catch(error: any) {
            console.log(error)
            return null;
        }
    }
}