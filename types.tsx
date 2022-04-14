interface OrderItem {
    api_key: string;
    order_id: number;
    product_id: number;
    amount: any;
    stock: number;
    name: string;
}

interface Order {
    api_key: string;
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
interface Product {
    api_key: string;
    id: number;
    article_number: string;
    name: string;
    description: string;
    specifiers: string;
    stock: number;
    location: string;
    price: number;
}

interface Delivery {
    api_key: string;
    id: number;
    product_id: number;
    product_name: string;
    amount: number;
    delivery_date: string;
    comment: string;
}
