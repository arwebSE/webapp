import React, { useState } from "react";
import { StyleSheet, View, Text, Button, ScrollView, ActivityIndicator } from "react-native";
import { StackActions } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

import orderModel from "../models/orders";
import productModel from "../models/products";
import { Typography } from "../styles";

export default function OrderDetails({ route, navigation }) {
    const { order } = route.params;
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState([]);

    const pick = async () => {
        const result = await orderModel.pickOrder(order);
        showMessage({
            message: result.title,
            description: result.message,
            type: result.type,
        });
        if (result.type === "success") {
            setProducts(await productModel.getProducts());
            navigation.dispatch(StackActions.popToTop());
        } else console.log("error picking!");
    };

    const setOrderAsNew = async (order) => {
        console.log(`setting order ${order.id} as new`);
        setLoading(true);
        order.status_id = 100;
        const result = await orderModel.updateOrder(order);
        showMessage({
            message: result.title,
            description: result.message,
            type: result.type,
        });
        setLoading(false);
    };

    const setOrderAddress = async (order) => {
        console.log(`setting order ${order.id} address to example address`);
        setLoading(true);
        order.address = "Valhallavägen 1";
        order.city = "Karlskrona";
        const result = await orderModel.updateOrder(order);
        showMessage({
            message: result.title,
            description: result.message,
            type: result.type,
        });
        setLoading(false);
    };

    const itemsList = order.order_items.map((item, index) => {
        return (
            <View style={styles.row} key={index}>
                <Text style={Typography.normal}>{item.name}</Text>
                <Text style={Typography.normal}>{item.amount}</Text>
                <Text style={Typography.normal}>{item.location}</Text>
            </View>
        );
    });

    if (loading) return <ActivityIndicator />;

    return (
        <View style={styles.root}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: "column" }}>
                <View style={{ flex: 1, justifyContent: "flex-start" }}>
                    <Text style={Typography.header1}>{order.name}</Text>
                    <Text style={Typography.normal}>{order.address}</Text>
                    <Text style={{ ...Typography.normal, flexDirection: "row", marginBottom: 20 }}>
                        {order.zip} {order.city}
                    </Text>
                    <Text style={Typography.header3}>Produkter:</Text>
                    <View style={styles.row}>
                        <Text style={Typography.bold}>Namn</Text>
                        <Text style={Typography.bold}>Antal</Text>
                        <Text style={Typography.bold}>Plats</Text>
                    </View>
                    {itemsList}
                </View>

                <View style={{ flex: 1, justifyContent: "center" }}>
                    {order.status === "Ny" ? (
                        <Button title="Pick Order" onPress={pick} />
                    ) : (
                        <>
                            <Button
                                title="Set as New (reset)"
                                onPress={() => {
                                    setOrderAsNew(order);
                                    navigation.dispatch(StackActions.popToTop());
                                }}
                            />
                            <Button
                                title="Set Address to BTH"
                                onPress={() => {
                                    setOrderAddress(order);
                                    navigation.dispatch(StackActions.popToTop());
                                }}
                            />
                        </>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingHorizontal: 10,
    },
    text: {
        color: "white",
    },
    title: {
        color: "#fff",
        fontSize: 32,
        padding: 20,
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
});
