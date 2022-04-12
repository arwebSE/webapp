import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, RefreshControl, FlatList } from "react-native";

import orderModel from "../models/orders";
import { Typography } from "../styles";
import { toast } from "../utils/misc";

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || false;
    const [loading, setLoading] = useState<boolean>(false);
    const [allOrders, setAllOrders] = useState([]);
    const [showAll, setShowAll] = useState<boolean>(false);

    if (reload) fetchOrders();
    async function fetchOrders() {
        setLoading(true);
        setAllOrders(await orderModel.getOrders());
        setLoading(false);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    async function setOrderAsNew(order) {
        console.log(`setting order ${order.id} as new`);
        setLoading(true);
        order.status_id = 100;
        const result = await orderModel.updateOrder(order);
        if (result) toast("Updated successfully!");
        else toast("Update Error!");
        setLoading(false);
    }

    return (
        <View style={styles.root}>
            <Text style={styles.title}>Ordrar redo att plockas</Text>
            <View style={styles.row}>
                <Text style={Typography.bold}>Name</Text>
                <Text style={Typography.bold}>Status</Text>
            </View>
            {showAll ? (
                <>
                    <FlatList
                        data={allOrders}
                        renderItem={({ item, index }) => (
                            <View style={styles.row}>
                                <Button
                                    title={item.name}
                                    key={index + "b1"}
                                    onPress={() => {
                                        navigation.navigate("Details", {
                                            order: item,
                                        });
                                    }}
                                />
                                {item.status !== "Ny" ? (
                                    <Text>New</Text>
                                ) : (
                                    <Button
                                        title={"set as new"}
                                        key={index + "b2"}
                                        onPress={() => {
                                            setOrderAsNew(item);
                                        }}
                                    />
                                )}
                            </View>
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={fetchOrders}
                                colors={["black", "gray"]} // Android
                                tintColor={"white"} // iOS
                                title={"Reloading..."} // iOS
                                titleColor={"white"} // iOS
                            />
                        }
                    />
                    <View style={{ marginBottom: 50 }}>
                        <Button title="Show completed orders" onPress={() => setShowAll(true)} />
                    </View>
                </>
            ) : (
                <>
                    <FlatList
                        data={allOrders.filter((order) => order.status === "Ny")}
                        renderItem={({ item, index }) => (
                            <View style={styles.row}>
                                <Button
                                    title={item.name}
                                    key={index + "b1"}
                                    onPress={() => {
                                        navigation.navigate("Details", {
                                            order: item,
                                        });
                                    }}
                                />
                                <Text>New</Text>
                            </View>
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={fetchOrders}
                                colors={["black", "gray"]} // Android
                                tintColor={"white"} // iOS
                                title={"Reloading..."} // iOS
                                titleColor={"white"} // iOS
                            />
                        }
                    />
                    <View style={{ marginBottom: 50 }}>
                        <Button title="Hide completed orders" onPress={() => setShowAll(false)} />
                    </View>
                </>
            )}
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
