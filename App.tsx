import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";

import Stock from "./components/Stock";

const warehouse = require("./assets/warehouse.jpg");

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.base}>
                <Text style={styles.title}>LagerAppen</Text>
                <Image source={warehouse} style={styles.logo} />
                <Stock />
                <StatusBar style="light" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111",
    },
    base: {
        flex: 1,
        paddingLeft: 12,
        paddingRight: 12,
    },
    title: {
        color: "#fff",
        fontSize: 42,
        padding: 20,
        textAlign: "center",
    },
    logo: {
        width: 320 / 2,
        height: 240 / 2,
        alignSelf: "center",
        margin: 10,
    },
});
