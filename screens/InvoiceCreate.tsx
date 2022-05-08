import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { StackActions } from "@react-navigation/native";
import DateDropdown from "../components/DateDropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Typography } from "../styles";
import OrderDropdown from "./../components/OrderDropdown";
import invoiceModel from "../models/invoices";
import orderModel from "../models/orders";
import { toast } from "../utils/misc";

export default function InvoiceCreate({ navigation }) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});
    const [currentOrder, setCurrentOrder] = useState<Partial<Order>>({});
    const [wait, setWait] = useState<boolean>(true);
    const [disabled, setDisabled] = useState<boolean>(false);

    useEffect(() => {
        console.log("Invoice updated:", invoice);
    }, [invoice]);

    const addInvoice = async () => {
        invoice.order_id = currentOrder.id;
        console.log("adding invoice:", invoice);
        const invoiceResult = await invoiceModel.addInvoice(invoice);
        if (invoiceResult) {
            const updatedOrder = {
                ...currentOrder,
                status_id: 600,
            };
            const orderResult = await orderModel.updateOrder(updatedOrder);
            if (orderResult) {
                toast("Invoice successfully added!");
                navigation.dispatch(StackActions.popToTop());
            }
        }
    };

    return (
        <View style={styles.root}>
            <View>
                <Text style={{ ...Typography.header1 }}>New Invoice</Text>

                <Text style={{ ...Typography.bold }}>Order</Text>
                <OrderDropdown
                    invoice={invoice}
                    setInvoice={setInvoice}
                    setCurrentOrder={setCurrentOrder}
                    wait={wait}
                    setDisabled={setDisabled}
                />

                <Text style={{ ...Typography.bold }}>Date</Text>
                <DateDropdown invoice={invoice} setInvoice={setInvoice} setWait={setWait} />
            </View>

            <View style={styles.button}>
                <Button title="Save" onPress={() => addInvoice()} disabled={disabled} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "space-between",
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
