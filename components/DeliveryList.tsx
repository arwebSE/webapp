import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, RefreshControl, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import deliveryModel from "../models/deliveries";
import { Typography } from "../styles";

export default function Deliveries({ navigation }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [allDeliveries, setAllDeliveries] = useState([]);

    async function fetchDeliveries() {
        setLoading(true);
        setAllDeliveries(await deliveryModel.getDeliveries());
        setLoading(false);
    }

    const isFocused = useIsFocused();
    useEffect(() => {
        isFocused && fetchDeliveries();
    }, [isFocused]);

    const newDelivery = () => {
        console.log("go to new delivery view");
        navigation.navigate("DeliveryCreate");
    };

    return (
        <View style={styles.root}>
            <Text style={styles.title}>Inleveranser</Text>

            <FlatList
                data={allDeliveries}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Text style={Typography.header4}>
                            {item.amount}x "{item.product_name}"
                        </Text>
                        <Text style={Typography.normal}>Delivered: {item.delivery_date}</Text>
                        <Text style={Typography.normal}>Comment: {item.comment}</Text>
                    </View>
                )}
                keyExtractor={(_item, index) => index.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={fetchDeliveries}
                        colors={["black", "gray"]} // Android
                        tintColor={"white"} // iOS
                        titleColor={"white"} // iOS
                    />
                }
            />
            <View style={styles.button}>
                <Button title={"Make new delivery"} onPress={() => newDelivery()} />
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
    container: {
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#333",
        marginVertical: 5,
    },
    button: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#333",
        backgroundColor: "#111",
    },
});
