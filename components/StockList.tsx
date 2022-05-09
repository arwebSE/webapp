import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Text, View, StyleSheet, FlatList, RefreshControl } from "react-native";

import productModel from "../models/products";

export default function StockList({ products, setProducts }) {
    const [loading, setLoading] = useState<boolean>(false);

    async function fetchProducts() {
        setLoading(true);
        setProducts(await productModel.getProducts());
        setLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const isFocused = useIsFocused();
    useEffect(() => {
        isFocused && fetchProducts();
    }, [isFocused]);

    return (
        <FlatList
            data={products}
            renderItem={({ item, index }) => (
                <View key={index} style={styles.container}>
                    <Text style={styles.textLeft}>{item.name}</Text>
                    <Text style={styles.textRight}>{item.stock}</Text>
                </View>
            )}
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={fetchProducts}
                    colors={["black", "gray"]} // Android
                    tintColor={"white"} // iOS
                />
            }
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
    textLeft: {
        color: "#bbb",
        fontSize: 18,
        textAlign: "left",
    },
    textRight: {
        color: "#bbb",
        fontSize: 18,
        textAlign: "right",
    },
});
