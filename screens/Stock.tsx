import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, RefreshControl } from "react-native";

import productModel from "../models/products";

function StockList({products, setProducts}) {
    const [loading, setLoading] = useState<boolean>(false);

    async function fetchProducts() {
        setLoading(true);
        setProducts(await productModel.getProducts());
        setLoading(false)
    }

    useEffect(() => {
        fetchProducts();
    }, []);

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
                    title={"Reloading..."} // iOS
                    titleColor={"white"} // iOS
                />
            }
        />
    );
}

export default function Stock({products, setProducts}) {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Name</Text>
                <Text style={styles.title}>Amount</Text>
            </View>
            <StockList products={products} setProducts={setProducts}/>
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
