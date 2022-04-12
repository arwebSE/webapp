import config from "../config/config.json";

const products = {
    getProducts: async function getProducts() {
        const response = await fetch(`${config.baseUrl}/products?api_key=${config.apiKey}`);
        const result = await response.json();
        return result.data;
    },
};

export default products;
