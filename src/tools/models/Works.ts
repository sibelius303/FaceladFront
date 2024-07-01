// const urlBase: string = 
// const tokenBase: string = 

interface WorkData {
    id: number;
    name: string;
    description: string;
    is_paid: boolean;
    priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
    manager: string;
    is_active: boolean;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
  }

export default class Work {
    static async postWork(obj: WorkData, token: string): Promise<any | null> {
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}works/`, {
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

    static async getWork(token: string): Promise<any | null> {
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}works/`, {
                method: 'GET',
                headers,
            });
            return await response.json();
        } catch(error: any) {
            return null;
        }
    }

    static async getUniqueWork(token: string, id: number): Promise<any | null> {
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}works/${id}`, {
                method: 'GET',
                headers,
            });
            return await response.json();
        } catch(error: any) {
            return null;
        }
    }

    static async deletedWork(token: string, id: number): Promise<any | null> {
        console.log("entreeee", token)
        console.log("soy el id", id)
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}works/${id}`, {
                method: 'DELETE',
                headers,
            });
            return await response.json();
        } catch(error: any) {
            return null;
        }
    }

    static async putWork(obj:any, token: string, id: number): Promise<any | null> {
        console.log("entreeee", token)
        console.log("soy el id", id)
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}works/${id}`, {
                method: 'PUT',
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
}