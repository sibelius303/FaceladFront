// const urlBase: string = 
// const tokenBase: string = 

interface WorkData {
    id: number;
    currency: string;
    billing_date: string;
    due_date: string;
    total_amount: number;
    title: string;
    folio: number;
    description: string;
    status: string;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    work_id: number;
}

export default class Billings {
    static async postBillings(obj: WorkData, token: string): Promise<any | null> {
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}billings/`, {
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

    static async postPayment(obj: WorkData, token: string): Promise<any | null> {
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}payments/`, {
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

    static async getBillings(token: string): Promise<any | null> {
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}billings/`, {
                method: 'GET',
                headers,
            });
            return await response.json();
        } catch(error: any) {
            return null;
        }
    }

    static async getUniqueBillings(token: string, id: number): Promise<any | null> {
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}billings/${id}`, {
                method: 'GET',
                headers,
            });
            return await response.json();
        } catch(error: any) {
            return null;
        }
    }

    static async getUniquePayment(token: string, id: number): Promise<any | null> {
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}payments/${id}/`, {
                method: 'GET',
                headers,
            });
            return await response.json();
        } catch(error: any) {
            return null;
        }
    }

    static async deletedBillings(token: string, id: number): Promise<any | null> {
        console.log("entreeee", token)
        console.log("soy el id", id)
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}billings/${id}/`, {
                method: 'DELETE',
                headers,
            });
            return await response.json();
        } catch(error: any) {
            return null;
        }
    }

    static async deletedPayments(token: string, id: number): Promise<any | null> {
        console.log("entreeee", token)
        console.log("soy el id", id)
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}payments/${id}/`, {
                method: 'DELETE',
                headers,
            });
            return await response.json();
        } catch(error: any) {
            return null;
        }
    }

    static async putBillings(obj:any, token: string, id: number): Promise<any | null> {
        console.log("entreeee", token)
        console.log("soy el id", id)
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}billings/${id}/`, {
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

    static async putPayment(obj:any, token: string, id: number): Promise<any | null> {
        console.log("entreeee", token)
        console.log("soy el id", id)
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}payments/${id}/`, {
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

    static async getTotalAmount(data:any, token: string): Promise<any | null> {
        console.log("entreeee", token)
        console.log("soy la data", data)
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Authorization", `${token}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}billings/${data.year}/${data.month}/`, {
                method: 'GET',
                headers,
            });
            return await response.json();
        } catch(error: any) {
            return null;
        }
    }
}