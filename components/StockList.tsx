import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Text, View, StyleSheet, FlatList, RefreshControl } from "react-native";

import productModel from "../models/products";

export default function StockList() {
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState([]);

    async function fetchProducts() {
        setLoading(true);
        const prod = await productModel.getProducts();
        setProducts(prod);
        console.log("got prods:", prod);
        
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
            renderItem={({ item }) => (
                <View style={styles.container}>
                    <Text style={styles.textLeft}>{item.name}</Text>
                    <Text style={styles.textRight}>{item.stock}</Text>
                </View>
            )}
            keyExtractor={(_item, index) => index.toString()}
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
