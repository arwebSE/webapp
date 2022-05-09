import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, RefreshControl, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import orderModel from "../models/orders";
import { Typography } from "../styles";

export default function OrderList({ navigation }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [allOrders, setAllOrders] = useState([]);
    const [showAll, setShowAll] = useState<boolean>(false);

    async function fetchOrders() {
        setLoading(true);
        setAllOrders(await orderModel.getOrders());
        setLoading(false);
    }

    const isFocused = useIsFocused();
    useEffect(() => {
        isFocused && fetchOrders();
    }, [isFocused]);

    return (
        <View style={styles.root}>
            {showAll ? (
                <Text style={styles.title}>All Orders</Text>
            ) : (
                <Text style={styles.title}>Orders Ready to Pack</Text>
            )}
            <View style={styles.row}>
                <Text style={Typography.bold as any}>Name</Text>
                <Text style={Typography.bold as any}>Status</Text>
            </View>

            <FlatList
                data={showAll ? allOrders : allOrders.filter((order) => order.status === "Ny")}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Button
                            title={item.name}
                            onPress={() => {
                                navigation.navigate("OrderDetails", {
                                    order: item,
                                });
                            }}
                        />
                        <Text style={Typography.normal}>{item.status}</Text>
                    </View>
                )}
                keyExtractor={(_item, index) => index.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={fetchOrders}
                        colors={["black", "gray"]} // Android
                        tintColor={"white"} // iOS
                        titleColor={"white"} // iOS
                    />
                }
            />
            <View style={{ marginBottom: 50 }}>
                <Button
                    title={showAll ? "Hide completed orders" : "Show completed orders"}
                    onPress={() => setShowAll(!showAll)}
                />
            </View>
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
