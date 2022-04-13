import config from "../config/config.json";

const orderItems = {
    updateOrderItem: async function updateOrderItem(item: Partial<OrderItem>) {
        item.api_key = config.apiKey;
        const response = await fetch(`${config.baseUrl}/order_items`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
        });
        if (response.status === 204) return true;
        else {
            console.log(`Error: Failed to update orderItem ${item.product_id}`);
            return false;
        }
    },
};

export default orderItems;
