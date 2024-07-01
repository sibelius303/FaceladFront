// const urlBase: string = 
// const tokenBase: string = 

interface ClientData {
    name: string | null;
    company: string | null;
    email: string | null;
    phone: string | null;
    country: string | null;
    language: string | null;
    description: string | null;
}

export default class Client {
    static async postClient(obj: ClientData, token: string): Promise<any | null> {
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}clients/`, {
                method: 'POST',
                headers,
                body: JSON.stringify(
                    obj
                )
            });
            return await response.json();
        } catch(error: any) {
            return null;
        }
    }

    static async getClient(token: string): Promise<any | null> {
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}clients/`, {
                method: 'GET',
                headers,
            });
            return await response.json();
        } catch(error: any) {
            console.log(error)
            return null;
        }
    }

    static async getUniqueClient(token: string, id: number): Promise<any | null> {
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}clients/${id}`, {
                method: 'GET',
                headers,
            });
            return await response.json();
        } catch(error: any) {
            return null;
        }
    }

    static async deletedClient(token: string, id: number): Promise<any | null> {
        console.log("entreeee", token)
        console.log("soy el id", id)
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}clients/${id}`, {
                method: 'DELETE',
                headers,
            });
            return await response.json();
        } catch(error: any) {
            return null;
        }
    }

    static async putClient(obj:any, token: string, id: number): Promise<any | null> {
        console.log("entreeee", token)
        console.log("soy el id", id)
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}clients/${id}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify(
                    obj
                )
            });
            console.log(response)
            return await response.json();
        } catch(error: any) {
            return null;
        }
    }
}