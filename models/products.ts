import config from "../config/config.json";

const products = {
    getProducts: async function getProducts() {
        const response = await fetch(`${config.baseUrl}/products?api_key=${config.apiKey}`);
        const result = await response.json();
        return result.data;
    },
    updateProduct: async function updateProduct(product: Partial<Product>) {
        product.api_key = config.apiKey;
        console.log("Attempting to update product", product.name);

        const response = await fetch(`${config.baseUrl}/products`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        if (response.status === 204) {
            console.log("Product update success!");
            return {
                title: "Product updated!",
                message: "Successfully updated product!",
                type: "success",
            };
        } else {
            console.log(`Error: Failed to update product ${product.name}`);
            return {
                title: "Error updating order",
                message: `Failed to update product ${product.name}.`,
                type: "danger",
            };
        }
    },
};

export default products;
