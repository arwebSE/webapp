import { createStackNavigator } from "@react-navigation/stack";

import OrderList from "./OrderList";
import OrderDetails from "./OrderDetails";

const Stack = createStackNavigator();

export default function Orders({ route, navigation, products, setProducts }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="OrderList" options={{ title: "Order List" }}>
                {() => <OrderList products={products} setProducts={setProducts} navigation={navigation} />}
            </Stack.Screen>
            <Stack.Screen name="OrderDetails" options={{ title: "Order Details" }}>
                {() => <OrderDetails route={route} navigation={navigation} setProducts={setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
