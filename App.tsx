import React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import FlashMessage from "react-native-flash-message";

import Navigation from "./navigation";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <RootSiblingParent>
                <Navigation />
            </RootSiblingParent>
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
