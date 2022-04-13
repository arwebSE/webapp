import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";

import Colors from "../constants/Colors";

import NotFoundScreen from "../screens/NotFoundScreen";
import Home from "../screens/Home";
import Orders from "../screens/Orders";
import SettingsModal from "../screens/SettingsModal";
import { Pressable } from "react-native";

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
            <Stack.Group>
                <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen
                    name="SettingsModal"
                    component={SettingsModal}
                    options={{ title: "Settings", headerLeft: null }}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
}

const routeIcons = {
    Home: "home",
    Orders: "file-tray-stacked",
};
const Tab = createBottomTabNavigator();
function BottomTabNavigator() {
    const [products, setProducts] = useState([]);
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
            <Tab.Screen
                name="Home"
                options={({ navigation }) => ({
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate("SettingsModal")}
                            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
                        >
                            <Ionicons name="cog" size={32} color={"white"} style={{ padding: 5 }} />
                        </Pressable>
                    ),
                })}
            >
                {() => <Home products={products} setProducts={setProducts} />}
            </Tab.Screen>
            <Tab.Screen
                name="Orders"
                options={({ route, navigation }) => ({
                    headerShown: false,
                    title: "Order List",
                    tabBarLabel: "Orders",
                })}
            >
                {() => <Orders setProducts={setProducts} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}
