import config from "../config/config.json";
import storage from "./storage";

const invoices = {
    getInvoices: async function getInvoices() {
        const token = await storage.readToken();
        if (token) {
            const response = await fetch(`${config.baseUrl}/invoices?api_key=${config.apiKey}`, {
                headers: { "x-access-token": [token.token] },
            });
            const result = await response.json();
            return result.data;
        } else {
            console.log("Error getting invoices: No valid token.");
        }
        return;
    },
    addInvoice: async function addInvoice(invoice: Partial<Invoice>) {
        invoice.api_key = config.apiKey;
        console.log("Attempting to add invoice:", invoice);
        const token = await storage.readToken();
        if (token) {
            const response = await fetch(`${config.baseUrl}/invoices`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-access-token": [token.token] },
                body: JSON.stringify(invoice),
            });
            const result = await response.json();
            if (!result.errors) return true;
            else {
                console.log("Error: Failed to add invoice:", result.errors);
                return false;
            }
        } else {
            console.log("Error adding invoices: No valid token.");
        }
        return;
    },
    deleteInvoice: async function deleteInvoice(invoice: Partial<Invoice>) {
        invoice.api_key = config.apiKey;
        console.log("Attempting to DELETE invoice:", invoice);
        const token = await storage.readToken();
        if (token) {
            const response = await fetch(`${config.baseUrl}/invoices`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", "x-access-token": [token.token] },
                body: JSON.stringify(invoice),
            });
            const result = await response.json();
            if (!result.errors) return true;
            else {
                console.log("Error: Failed to DELETE invoice:", result.errors);
                return false;
            }
        } else {
            console.log("Error DELETING invoice: No valid token.");
        }
        return;
    },
};

export default invoices;
