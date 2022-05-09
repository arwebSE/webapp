import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

import orderModel from "../models/orders";

export default function OrderDropdown(props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [orders, setOrders] = useState<Order[]>([]);
    let ordersHash: any = {};

    const fetchOrders = async () => {
        setLoading(true);
        const fetchedOrders = await orderModel.getOrders();
        const packagedOrders = fetchedOrders.filter((order) => order.status_id > 100 && order.status_id < 600);
        setOrders(packagedOrders);
        if (packagedOrders.length > 0) {
            props.setCurrentOrder(packagedOrders[0]); // select first order at load
            const orderSum = packagedOrders[0].order_items.reduce((n, { price, amount }) => n + price * amount, 0);
            const newInvoice = { ...props.invoice, order_id: packagedOrders[0].id, total_price: orderSum };
            props.setInvoice(newInvoice);
        } else {
            console.log("Warning! No orders marked as 'packed'!");
            showMessage({
                message: "Warning",
                description: "No orders marked as packed!",
                type: "warning",
            });
            props.setDisabled(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (props.wait) {
            console.log("waiting...");
        } else if (!props.wait) {
            console.log("props.wait is false!");
            objNotEmpty(props.invoice) && fetchOrders();
        }
    }, [props.wait]);

    const objNotEmpty = async (obj) => {
        if (Object.keys(obj).length === 0) {
            console.log("objNotEmpty: obj length is 0. =(");
            return false;
        } else {
            console.log("objNotEmpty: obj not empty!");
            return true;
        }
    };

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            objNotEmpty(props.invoice) && fetchOrders();
        }
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
                //console.log("order items:", ordersHash[itemValue].order_items);
                const orderSum = ordersHash[itemValue].order_items.reduce(
                    (n, { price, amount }) => n + price * amount,
                    0
                );
                props.setInvoice({ ...props.invoice, order_id: itemValue, total_price: orderSum });
                props.setCurrentOrder(ordersHash[itemValue]);
            }}
            itemStyle={{ color: "white" }}
        >
            {itemsList}
        </Picker>
    );
}
