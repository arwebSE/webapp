import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, View, ScrollView, RefreshControl, StyleSheet, Alert } from "react-native";
import { DefaultTheme, DataTable, Provider as PaperProvider } from "react-native-paper";

import Colors from "../constants/Colors";
import { Forms } from "../styles";
import invoiceModel from "../models/invoices";
import { useIsFocused } from "@react-navigation/native";

export default function Invoices({ navigation }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [invoices, setInvoices] = useState([]);

    const fetchInvoices = async () => {
        setLoading(true);
        setInvoices(await invoiceModel.getInvoices());
        setLoading(false);
    };

    const isFocused = useIsFocused();
    useEffect(() => {
        isFocused && fetchInvoices();
    }, [isFocused]);

    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: Colors.tint,
            accent: "#f1c40f",
            text: "white",
        },
        dark: true,
    };

    const confirmDelete = (invoice) => {
        const deleteInvoice = async () => {
            console.log("Deleting invoice", `${invoice.id} - ${invoice.name}`);
            await invoiceModel.deleteInvoice(invoice);
            fetchInvoices();
        };
        Alert.alert("Confirm Delete", "Are you sure you want to delete the invoice?", [
            { text: "Delete", onPress: deleteInvoice, style: "destructive" },
            { text: "Cancel", style: "cancel" },
        ]);
    };

    return (
        <>
            <View style={{ flex: 1 }}>
                {loading ? (
                    <ActivityIndicator />
                ) : (
                    <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchInvoices} />}>
                        <PaperProvider theme={theme}>
                            <DataTable>
                                <DataTable.Header style={{ marginRight: 20 }}>
                                    <DataTable.Title>Name</DataTable.Title>
                                    <DataTable.Title>Due Date</DataTable.Title>
                                    <DataTable.Title numeric>Cost</DataTable.Title>
                                </DataTable.Header>
                                {invoices.map((invoice, index) => {
                                    return (
                                        <View style={styles.row} key={index}>
                                            <DataTable.Row style={{ flex: 1 }}>
                                                <DataTable.Cell>{invoice.name}</DataTable.Cell>
                                                <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
                                                <DataTable.Cell numeric>{invoice.total_price}</DataTable.Cell>
                                            </DataTable.Row>
                                            <View style={styles.button}>
                                                <Button title="x" onPress={() => confirmDelete(invoice)} />
                                            </View>
                                        </View>
                                    );
                                })}
                            </DataTable>
                        </PaperProvider>
                    </ScrollView>
                )}
            </View>

            <View style={Forms.button}>
                <Button title="Create New Invoice" onPress={() => navigation.navigate("InvoiceCreate")} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        marginVertical: 3,
    },
});
