import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";

import Navigation from "./navigation";
import authModel from "./models/auth";

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(() => {
        const login = async () => {
            setIsLoggedIn(await authModel.login());
        };
        login();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <RootSiblingParent>
                {isLoggedIn ? (
                    <Tab.Screen name="Faktura" component={Invoices} />
                ) : (
                    <Tab.Screen name="Logga in">{() => <Auth setIsLoggedIn={setIsLoggedIn} />}</Tab.Screen>
                )}
                <Navigation />
            </RootSiblingParent>
            <StatusBar style="light" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111",
    },
});
