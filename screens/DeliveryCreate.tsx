import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { StackActions } from "@react-navigation/native";
import DateDropdown from "../compontents/DateDropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Typography } from "../styles";
import ProductDropDown from "../compontents/ProductDropdown";
import deliveryModel from "../models/deliveries";
import productModel from "../models/products";
import { toast } from "../utils/misc";

export default function NewDelivery({ navigation }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
    const commentEl = useRef(null);

    useEffect(() => {
        console.log("Delivery updated:", delivery);
    }, [delivery]);

    useEffect(() => {
        console.log("currentProduct updated:", currentProduct);
    }, [currentProduct]);

    const addDelivery = async () => {
        console.log("call: product=", currentProduct, "delivery=", delivery);

        const deliveryResult = await deliveryModel.addDelivery(delivery);
        if (deliveryResult) {
            const updatedProduct = {
                ...currentProduct,
                stock: (currentProduct.stock || 0) + (delivery.amount || 0),
            };
            const productResult = await productModel.updateProduct(updatedProduct);
            if (productResult) {
                toast("Delivery successfully added!");
                navigation.dispatch(StackActions.popToTop());
            }
        }
    };

    return (
        <KeyboardAwareScrollView style={styles.root} extraHeight={150}>
            <Text style={{ ...Typography.header1 }}>Ny inleverans</Text>

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
                keyboardAppearance="dark"
                placeholder="Antal produkter..."
                placeholderTextColor={"#bbb"}
                onSubmitEditing={() => commentEl.current.focus()}
                returnKeyType="done"
            />

            <Text style={{ ...Typography.bold }}>Kommentar</Text>
            <TextInput
                style={styles.input}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content });
                }}
                value={delivery?.comment}
                keyboardAppearance="dark"
                placeholder="Skriv en kommentar..."
                placeholderTextColor={"#bbb"}
                ref={commentEl}
                onSubmitEditing={() => addDelivery()}
                returnKeyType="done"
            />

            <View style={styles.button}>
                <Button title="Skapa inleverans" onPress={() => addDelivery()} />
            </View>
        </KeyboardAwareScrollView>
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
        color: "white",
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
