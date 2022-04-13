import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, FlatList, RefreshControl, ScrollView, ActivityIndicator } from "react-native";
import { StackActions } from "@react-navigation/native";

import orderModel from "../models/orders";
import productModel from "../models/products";
import { Typography } from "../styles";
import { toast } from "../utils/misc";

export default function OrderDetails({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [loading, setLoading] = useState<boolean>(false);
    const [productsList, setProductsList] = useState([]);

    const fetchProducts = async () => {
        setLoading(true);
        setProductsList(await productModel.getProducts());
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const pick = async () => {
        const results = await orderModel.pickOrder(order);
        if (!results) console.log("error picking!");
        else toast("Order picked successfully!");
        
        setProducts(await productModel.getProducts());
        navigation.dispatch(StackActions.popToTop());
    };

    const setOrderAsNew = async (order) => {
        console.log(`setting order ${order.id} as new`);
        setLoading(true);
        order.status_id = 100;
        const result = await orderModel.updateOrder(order);
        if (result) toast("Updated successfully!");
        else toast("Update Error!");
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
                    <View style={styles.row}>
                        <Button title="Pick Order" onPress={pick} />
                        <Button
                            title="Set as New"
                            onPress={() => {
                                setOrderAsNew(order);
                                navigation.dispatch(StackActions.popToTop());
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

{
    /* <FlatList
                data={productsList}
                renderItem={({ item, index }) => (
                        <Text style={styles.text} key={index}>
                            {item.name} - {item.amount} - {item.location}
                        </Text>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={fetchProducts}
                        colors={["black", "gray"]} // Android
                        tintColor={"white"} // iOS
                        title={"Reloading..."} // iOS
                        titleColor={"white"} // iOS
                    />
                }
            />
 */
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
