import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";

import Stock from "./components/Stock";

const warehouse = require("./assets/warehouse.jpg");

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.base}>
                <Text style={{ color: "#fff", fontSize: 42 }}>Lager-Appen</Text>
                <Image source={warehouse} style={{ width: 320, height: 240 }} />
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
});
