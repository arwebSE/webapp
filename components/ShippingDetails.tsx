import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, ActivityIndicator, Platform, Linking } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { showMessage } from "react-native-flash-message";

import { Typography } from "../styles";
import getCoordinates from "../models/nominatim";

export default function ShippingDetails({ route }) {
    const { order } = route.params;
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMsg, setLoadingMsg] = useState<string>("");
    const [destLabel, setDestLabel] = useState<string | null>(null);
    const [initMarker, setInitMarker] = useState(null);
    const [destMarker, setDestMarker] = useState(null);
    const [initCoords, setInitCoords] = useState({ coords: { latitude: 56.1612, longitude: 15.5869, accuracy: 1 } });
    const [destCoords, setDestCoords] = useState(null);

    const fetchMarker = async () => {
        setLoading(true);
        setLoadingMsg("Loading destination...");
        const results = await getCoordinates(`${order.address}, ${order.city}`);
        const fetchedCoords = { latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) };
        setDestCoords(fetchedCoords);
        const displayName = results[0].display_name;
        setDestLabel(displayName);
        setDestMarker(<Marker coordinate={fetchedCoords} title={displayName} />);
        setLoadingMsg("Getting your location...");
        await getMyLocation();
        setLoading(false);
    };

    const getMyLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("Permission to access location was denied");
            showMessage({
                message: "Permission denied",
                description: "Permission to access location was denied.",
                type: "warning",
            });
            return;
        }
        const gpsLocation = await Location.getCurrentPositionAsync({});
        setInitCoords(gpsLocation);
        console.log("got initcoords", gpsLocation);

        setInitMarker(
            <Marker
                coordinate={{
                    latitude: gpsLocation.coords.latitude,
                    longitude: gpsLocation.coords.longitude,
                }}
                title="My Location"
                pinColor="blue"
            />
        );
    };

    useEffect(() => {
        fetchMarker();
    }, []);

    const openInGMaps = () => {
        const lat = destCoords.latitude;
        const long = destCoords.longitude;
        console.log(`Opening GMaps with data: ${lat}, ${long} - ${destLabel}`);
        const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
        const latLng = `${lat},${long}`;
        const url = Platform.select({
            ios: `https://www.google.com/maps/search/?api=1&query=${destLabel}&center=${lat},${long}`,
            android: `${scheme}${latLng}(${destLabel})`,
        });
        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    const browser_url = "https://www.google.de/maps/@" + lat + "," + long;
                    return Linking.openURL(browser_url);
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => {
                console.log(`Error opening GMaps: ${err}`);
                showMessage({
                    message: "GMaps Error",
                    description: `Error opening GMaps: ${err}`,
                    type: "danger",
                });
            });
    };

    if (loading)
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size={"large"} color={"white"} />
                <Text style={Typography.label}>{loadingMsg}</Text>
            </View>
        );
    return (
        <View style={{ flex: 1 }}>
            <Text style={Typography.header1}>Skicka order</Text>

            <Text style={Typography.header3}>{order.name}</Text>
            <Text style={Typography.header4}>{order.address}</Text>
            <Text style={Typography.header4}>
                {order.zip} {order.city}, {order.country}
            </Text>

            <Button onPress={() => openInGMaps()} title="Open in Google Maps" />
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        ...initCoords?.coords,
                        latitudeDelta: 0.2,
                        longitudeDelta: 0.2,
                    }}
                >
                    {destMarker}
                    {initMarker}
                    <Circle
                        center={initCoords?.coords}
                        radius={100}
                        color="rgba(158, 158, 255, 1.0)"
                        fillColor="rgba(158, 158, 255, 0.3)"
                    />
                </MapView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        borderColor: "white",
    },
});
