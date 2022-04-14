import config from "../config/config.json";

const deliveries = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${config.baseUrl}/deliveries?api_key=${config.apiKey}`);
        const result = await response.json();
        return result.data;
    },
};

export default deliveries;
