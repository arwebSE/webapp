import React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";

import Navigation from "./navigation";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Navigation />
            <StatusBar style="light" />
            <FlashMessage position="top" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111",
    },
});
