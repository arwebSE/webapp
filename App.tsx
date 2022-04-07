import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import warehouse from "./assets/warehouse.jpg";

import Stock from './components/Stock';

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
