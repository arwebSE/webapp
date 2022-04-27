import config from "../config/config.json";
import storage from "./storage";

const auth = {
    loggedIn: async function loggedIn() {
        const token = await storage.readToken();
        const twentyFourHours = 1000 * 60 * 60 * 24;
        if (token) {
            const notExpired = new Date().getTime() - token.date < twentyFourHours;
            return token && notExpired;
        }
        return;
    },
    login: async function login(email: string, password: string) {
        const data = {
            api_key: config.apiKey,
            email: email,
            password: password,
        };
        const response = await fetch(`${config.baseUrl}/auth/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
        });
        const result = await response.json();

        await storage.storeToken(result.data.token);

        return result.data.message;
    },
    register: async function register(email: string, password: string) {
        const data = {
            api_key: config.apiKey,
            email: email,
            password: password,
        };
        const response = await fetch(`${config.baseUrl}/auth/register`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
        });

        return await response.json();
    },
    logout: async function logout() {
        await storage.deleteToken();
    },
};

export default auth;
