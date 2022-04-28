import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator } from "react-native";

import orderModel from "../models/orders";
import { useIsFocused } from "@react-navigation/native";

export default function OrderDropdown(props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [orders, setOrders] = useState<Order[]>([]);
    let ordersHash: any = {};

    const fetchOrders = async () => {
        setLoading(true);
        const fetchedOrders = await orderModel.getOrders();
        const packagedOrders = fetchedOrders.filter((order) => order.status_id > 100 && order.status_id < 600);
        setOrders(packagedOrders);
        props.setCurrentOrder(packagedOrders[0]);
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
        
    }, []);

    const isFocused = useIsFocused();
    useEffect(() => {
        isFocused && fetchOrders();
    }, [isFocused]);

    const itemsList = orders.map((order, index) => {
        ordersHash[order.id] = order;
        return <Picker.Item key={index} label={`${order.id} - ${order.name}`} value={order.id} />;
    });

    if (loading) return <ActivityIndicator />;
    return (
        <Picker
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) => {
                props.setInvoice({ ...props.invoice, order_id: itemValue, total_price: 33 /* CHANGE THIS */ });
                props.setCurrentOrder(ordersHash[itemValue]);
            }}
            itemStyle={{ color: "white" }}
        >
            {itemsList}
        </Picker>
    );
}
