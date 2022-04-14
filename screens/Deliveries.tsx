import { createStackNavigator } from "@react-navigation/stack";

import DeliveryList from "./DeliveryList";
import DeliveryCreate from "./DeliveryCreate";

const Stack = createStackNavigator();

export default function Deliveries({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                component={DeliveryList}
                name="DeliveryList"
                options={({ navigation }) => ({ title: "Deliveries List" })}
            />
            <Stack.Screen
                component={DeliveryCreate}
                name="DeliveryCreate"
                options={({ navigation }) => ({ title: "Create Delivery" })}
            />
        </Stack.Navigator>
    );
}
