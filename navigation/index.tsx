import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";

import Colors from "../constants/Colors";
import authModel from "../models/auth";

import Auth from "../components/Auth";
import SettingsModal from "../screens/SettingsModal";
import NotFoundScreen from "../screens/NotFoundScreen";
import Home from "../screens/Home";
import Orders from "../screens/Orders";
import Deliveries from "../screens/Deliveries";
import Invoices from "../screens/Invoices";

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
    Orders: "clipboard",
    Deliveries: "file-tray-stacked",
    Auth: "enter",
    Invoices: "cash",
};
const Tab = createBottomTabNavigator();
function BottomTabNavigator() {
    const [products, setProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    const setLoggedIn = async () => {
        setIsLoggedIn(await authModel.loggedIn());
    };

    useEffect(() => {
        setLoggedIn();
    }, []);

    const isFocused = useIsFocused();
    useEffect(() => {
        isFocused && setLoggedIn();
    }, [isFocused]);

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
            <Tab.Screen
                name="Deliveries"
                component={Deliveries}
                options={({ route, navigation }) => ({
                    headerShown: false,
                    tabBarLabel: "Deliveries",
                })}
            />
            {isLoggedIn ? (
                <Tab.Screen
                    name="Invoices"
                    component={Invoices}
                    options={({ route, navigation }) => ({
                        headerShown: false,
                    })}
                />
            ) : (
                <Tab.Screen
                    name="Auth"
                    options={({ route, navigation }) => ({
                        headerShown: false,
                        title: "Login",
                    })}
                >
                    {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
                </Tab.Screen>
            )}
        </Tab.Navigator>
    );
}
