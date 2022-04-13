import config from "../config/config.json";

const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.baseUrl}/orders?api_key=${config.apiKey}`);
        const result = await response.json();
        return result.data;
    },
    pickOrder: async function pickOrder(order: Partial<Order>) {
        console.log("request to pick order:", order.order_items);

        // TODO: Minska lagersaldo för de
        // orderrader som finns i ordern
        // TODO: Ändra status för ordern till packad
    },
    updateOrder: async function updateOrder(order) {
        order.api_key = config.apiKey;
        const response = await fetch(`${config.baseUrl}/orders`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        });
        if (response.status === 204) return true;
        else return false;
    },
};

export default orders;
