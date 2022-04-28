import config from "../config/config.json";
import products from "./products";

const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.baseUrl}/orders?api_key=${config.apiKey}`);
        const result = await response.json();
        return result.data;
    },
    pickOrder: async function pickOrder(order: Partial<Order>) {
        // if too few of any item
        for (let item of order.order_items) {
            if (item.amount > item.stock) {
                console.log(`Error: Too few ${item.name} in stock!`);
                return false;
            }
        }
        //updating stock
        for (let item of order.order_items) {
            const product = {
                ...item,
                id: item.product_id,
                stock: item.stock - item.amount,
            };
            delete product.product_id;
            delete product.amount;
            if (!(await products.updateProduct(product))) return false;
        }
        order.status_id = 200;
        if (await orders.updateOrder(order)) return true;
        else return false;
    },
    updateOrder: async function updateOrder(order: Partial<Order>) {
        order.api_key = config.apiKey;
        const response = await fetch(`${config.baseUrl}/orders`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        });
        if (response.status === 204) return true;
        else {
            console.log(`Error: Failed to update order: ${order.name}`);
            return false;
        }
    },
};

export default orders;
