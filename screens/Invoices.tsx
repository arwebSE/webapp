import { createStackNavigator } from "@react-navigation/stack";

import InvoiceList from "./InvoiceList";
import InvoiceCreate from "./InvoiceCreate";

const Stack = createStackNavigator();

export default function Deliveries({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                component={InvoiceList}
                name="InvoiceList"
                options={({ navigation }) => ({ title: "Invoices List" })}
            />
            <Stack.Screen
                component={InvoiceCreate}
                name="InvoiceCreate"
                options={({ navigation }) => ({ title: "Create Invoice" })}
            />
        </Stack.Navigator>
    );
}
