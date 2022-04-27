import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { StackActions } from "@react-navigation/native";

import config from "../config/config.json";
import { toast } from "../utils/misc";
import authModel from "../models/auth";
import Colors from "../constants/Colors";

export default function SettingsModal({ navigation }) {
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(() => {
        const setLoggedIn = async () => {
            setIsLoggedIn(await authModel.loggedIn());
        };
        setLoggedIn();
    }, []);

    const reset = async () => {
        const response = await fetch(`${config.baseUrl}/copier/reset`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ api_key: `${config.apiKey}` }),
        });
        if (response.status === 201) {
            toast("Reset successfully!");
            navigation.dispatch(StackActions.popToTop());
            return true;
        } else console.log("Failed to reset");
        return;
    };

    const logout = async () => {
        await authModel.logout();
        toast("Logged out!");
        navigation.dispatch(StackActions.popToTop());
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoggedIn ? (
                <>
                    <View style={styles.logout}>
                        <Pressable onPress={() => logout()} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
                            <Text style={styles.header}>Logout</Text>
                        </Pressable>
                    </View>

                    <View style={styles.reset}>
                        <Pressable onPress={() => reset()} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
                            <Text style={styles.header}>Reset DB</Text>
                        </Pressable>
                    </View>
                </>
            ) : (
                <Text>Login to access settings</Text>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    header: {
        fontSize: 35,
        fontWeight: "bold",
        color: "white",
    },
    user: {
        flexDirection: "row",
        marginBottom: 50,
    },
    reset: {
        backgroundColor: "red",
        borderRadius: 10,
        padding: 15,
        textAlign: "center",
        marginTop: 20,
    },
    logout: {
        backgroundColor: Colors.tint,
        borderRadius: 10,
        padding: 15,
        textAlign: "center",
    },
});
