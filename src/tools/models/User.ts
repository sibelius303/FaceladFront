// const urlBase: string = 
// const tokenBase: string = 

export default class User {
    static async login(username: string, password: string): Promise<any | null> {
        try {
            console.log(username)
            const headers: HeadersInit = new Headers();
            // headers.append("Authorization", `Basic ${process.env.TOKEN_PROD}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}auth/login/`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            return await response.json();
        } catch(error: any) {
            console.log("soy el error del login", error)
            return null;
        }
    }

    static async register(username: string, password: string, email: string): Promise<any | null> {
        try {
            const token: string = btoa(`${process.env.TOKEN_PROD}:`);
            console.log(token);
            const headers: HeadersInit = new Headers();
            // headers.append("Authorization", `Basic ${process.env.TOKEN_PROD}`);
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.API_URL}/register/`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            });
            return await response.json();
        } catch(error) {
            return error
        }
    }
}