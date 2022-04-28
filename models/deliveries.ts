import config from "../config/config.json";

const deliveries = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${config.baseUrl}/deliveries?api_key=${config.apiKey}`);
        const result = await response.json();
        return result.data;
    },
    addDelivery: async function addDelivery(delivery: Partial<Delivery>) {
        delivery.api_key = config.apiKey;
        console.log("Attempting to add delivery:", delivery);
        const response = await fetch(`${config.baseUrl}/deliveries`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(delivery),
        });
        const result = await response.json();
        if (!result.errors) return true;
        else {
            console.log("Error: Failed to add delivery", result.errors);
            return false;
        }
    },
};

export default deliveries;
