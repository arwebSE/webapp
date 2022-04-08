import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";

import Colors from "../constants/Colors";

import NotFoundScreen from "../screens/NotFoundScreen";
import Home from "../screens/Home";
import OrderList from "../screens/OrderList";
import OrderDetails from "./../screens/OrderDetails";

export default function Navigation() {
    return (
        <NavigationContainer theme={DarkTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createStackNavigator();
function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
            <Stack.Screen name="Details" component={OrderDetails} options={{ title: "Details" }} />
        </Stack.Navigator>
    );
}

const routeIcons = {
    Home: "home",
    Orders: "file-tray-stacked",
};
const Tab = createBottomTabNavigator();
function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: Colors.tint,
                tabBarIcon: ({ color, size }) => {
                    let iconName = routeIcons[route.name] || "alert";
                    return <Ionicons name={iconName} size={size} color={color} style={{ marginBottom: -3 }} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Orders" component={OrderList} options={{ title: "Order List", tabBarLabel: "Orders" }} />
        </Tab.Navigator>
    );
}
