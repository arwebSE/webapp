import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import config from "../config/config.json";

function StockList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${config.baseUrl}/products?api_key=${config.apiKey}`)
            .then((response) => response.json())
            .then((result) => setProducts(result.data));
    }, []);

    const list = products.map((product, index) => (
        <View key={index} style={styles.container}>
            <Text style={styles.textLeft}>{product.name}</Text>
            <Text style={styles.textRight}>{product.stock}</Text>
        </View>
    ));

    return <View>{list}</View>;
}

export default function Stock() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Name</Text>
                <Text style={styles.title}>Amount</Text>
            </View>
            <StockList />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        color: "#fff",
        fontSize: 24,
        paddingVertical: 10
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
