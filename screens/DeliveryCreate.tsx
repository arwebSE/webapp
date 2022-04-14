import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, ScrollView, TextInput } from "react-native";
import { StackActions } from "@react-navigation/native";

import { Typography } from "../styles";
import { toast } from "../utils/misc";
import ProductDropDown from "../compontents/ProductDropdown";
import DateDropdown from "../compontents/DateDropdown";

export default function NewDelivery() {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    const addDelivery = () => {
        console.log("add del!");
    };

    return (
        <ScrollView style={styles.root}>
            <Text style={{ ...Typography.header2 }}>Ny inleverans</Text>

            <Text style={{ ...Typography.bold }}>Produkt</Text>
            <ProductDropDown delivery={delivery} setDelivery={setDelivery} setCurrentProduct={setCurrentProduct} />

            <Text style={{ ...Typography.bold }}>Datum</Text>
            <DateDropdown delivery={delivery} setDelivery={setDelivery} />

            <Text style={{ ...Typography.bold }}>Antal</Text>
            <TextInput
                style={styles.input}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) });
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />

            <Text style={{ ...Typography.bold }}>Kommentar</Text>
            <TextInput
                style={styles.input}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content });
                }}
                value={delivery?.comment}
            />

            <Button title="Gör inleverans" onPress={() => addDelivery()} />
        </ScrollView>
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
    input: {
        fontSize: 20,
        marginBottom: 28,
        borderWidth: 1,
        padding: 10,
        borderColor: "#ccc",
        borderRadius: 10,
    },
});
