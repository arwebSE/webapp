import { Text, View, StyleSheet, Pressable, SafeAreaView } from "react-native";
import React from "react";

import config from "../config/config.json";
import { toast } from "../utils/misc";

const reset = async () => {
    const response = await fetch(`${config.baseUrl}/copier/reset?api_key=${config.apiKey}`, {
        method: "POST",
    });
    if (response.status === 201) {
        toast("Reset successfully!");
        return true;
    } else console.log("Failed to reset");
    return;
};

export default function SettingsModal() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.user}>
                <Text style={styles.title}>Reset DB below</Text>
            </View>

            <View style={styles.reset}>
                <Pressable onPress={() => reset()} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
                    <Text style={styles.header}>Reset</Text>
                </Pressable>
            </View>
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
    },
});
