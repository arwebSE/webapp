import React from "react";
import { Text, View, StyleSheet } from "react-native";

import productModel from "../models/products";
import StockList from "../components/StockList";

export default function Stock({ products, setProducts }) {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Name</Text>
                <Text style={styles.title}>Amount</Text>
            </View>
            <StockList products={products} setProducts={setProducts} />
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        color: "#fff",
        fontSize: 24,
        paddingVertical: 10,
    },
    container: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
});
