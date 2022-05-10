import { createStackNavigator } from "@react-navigation/stack";

import OrderList from "../components/OrderList";
import OrderDetails from "../components/OrderDetails";

const Stack = createStackNavigator();

export default function Orders() {
    
    return (
        <Stack.Navigator>
            <Stack.Screen
                component={OrderList}
                name="OrderList"
                options={({ navigation }) => ({ title: "Order List" })}
            />
            <Stack.Screen name="OrderDetails" options={{ title: "Order Details" }}>
                {({ navigation, route }) => (
                    <OrderDetails route={route} navigation={navigation} />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
