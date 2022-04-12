import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

import Stock from "./Stock";

const warehouse = require("../assets/warehouse.jpg");

export default function Home({products, setProducts}) {
    return (
        <View style={styles.base}>
            <Text style={styles.title}>LagerAppen</Text>
            <Image source={warehouse} style={styles.logo} />
            <Stock products={products} setProducts={setProducts} />
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        paddingLeft: 12,
        paddingRight: 12,
    },
    title: {
        color: "#fff",
        fontSize: 42,
        padding: 20,
        textAlign: "center",
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
    logo: {
        width: 320 / 2,
        height: 240 / 2,
        alignSelf: "center",
        margin: 10,
    },
});
