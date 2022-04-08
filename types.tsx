interface OrderItem {
    id: number;
    name: string;
}

interface Order {
    id: number;
    name: string;
    address: string;
    zip: number;
    city: string;
    country: string;
    status: string;
    status_id: number;
    order_items: Array<OrderItem>;
}
