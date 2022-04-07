import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import config from "../config/config.json";

function StockList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${config.baseUrl}/products?api_key=${config.apiKey}`)
            .then((response) => response.json())
            .then((result) => setProducts(result.data));
    }, []);

    const list = products.map((product, index) => (
        <Text key={index} style={{ color: "#eee" }}>
            {product.name} - {product.stock}
        </Text>
    ));

    return <View>{list}</View>;
}

export default function Stock() {
    return (
        <View>
            <Text style={{ color: "#eee", fontSize: 24 }}>Lagerförteckning</Text>
            <StockList />
        </View>
    );
}
