import { createStackNavigator } from "@react-navigation/stack";

import OrderList from "./OrderList";
import OrderDetails from "./OrderDetails";

const Stack = createStackNavigator();

export default function Orders({ setProducts }) {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="OrderList" options={{ title: "Order List" }}>
                {() => <OrderList setProducts={setProducts} />}
            </Stack.Screen>*/}

            <Stack.Screen
                component={OrderList}
                name="OrderList"
                options={({ navigation }) => ({ title: "Order List" })}
            />
            {/* <Stack.Screen
                component={OrderDetails}
                name="OrderDetails"
                options={({ navigation }) => ({ title: "Order Details" })}
            /> */}
            <Stack.Screen name="OrderDetails" options={{ title: "Order Details" }}>
                {({ navigation, route }) => (
                    <OrderDetails setProducts={setProducts} route={route} navigation={navigation} />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
