import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, View, ScrollView } from "react-native";
import { DefaultTheme, DataTable, Provider as PaperProvider } from "react-native-paper";

import Colors from "../constants/Colors";
import { Forms, Typography } from "../styles";
import invoiceModel from "../models/invoices";
import { useIsFocused } from "@react-navigation/native";

export default function Invoices({ navigation }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [invoices, setInvoices] = useState([]);

    async function fetchInvoices() {
        setLoading(true);
        setInvoices(await invoiceModel.getInvoices());
        setLoading(false);
    }

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

    if (loading && invoices) return <ActivityIndicator />;
    else {
        const table = invoices.map((invoice, index) => {
            return (
                <DataTable.Row key={index}>
                    <DataTable.Cell>{invoice.name}</DataTable.Cell>
                    <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
                    <DataTable.Cell numeric>{invoice.total_price}</DataTable.Cell>
                </DataTable.Row>
            );
        });

        return (
            <>
                <ScrollView>
                    <PaperProvider theme={theme}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Name</DataTable.Title>
                                <DataTable.Title>Due Date</DataTable.Title>
                                <DataTable.Title numeric>Cost</DataTable.Title>
                            </DataTable.Header>
                            {table}
                        </DataTable>
                    </PaperProvider>
                </ScrollView>
                <View style={Forms.button}>
                    <Button title="Skapa Faktura" onPress={() => navigation.navigate("InvoiceCreate")} />
                </View>
            </>
        );
    }
}
