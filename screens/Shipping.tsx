import { createStackNavigator } from "@react-navigation/stack";

import ShippingList from "../components/ShippingList";
import ShippingDetails from "../components/ShippingDetails";

const Stack = createStackNavigator();

export default function Shipping({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                component={ShippingList}
                name="ShippingList"
                options={({ navigation }) => ({ title: "Shipping List" })}
            />
            <Stack.Screen
                component={ShippingDetails}
                name="ShippingDetails"
                options={({ navigation }) => ({ title: "Shipping Details" })}
            />
        </Stack.Navigator>
    );
}
