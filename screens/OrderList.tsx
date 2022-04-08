import { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import orderModel from "../models/orders";
import { Typography } from "../styles";

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) fetchOrders();
    async function fetchOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const listOfOrders = allOrders
        /* .filter((order) => order.status === "Ny") */
        .map((order, index) => {
            return (
                <Button
                    title={order.name}
                    key={index}
                    onPress={() => {
                        navigation.navigate("Details", {
                            order: order,
                        });
                    }}
                />
            );
        });

    return (
        <View style={styles.root}>
            <Text style={Typography.header2}>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    text: { color: "white" },
});
