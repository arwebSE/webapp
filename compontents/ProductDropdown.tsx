import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator } from "react-native";

import productModel from "../models/products";

export default function ProductDropDown(props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setProducts(await productModel.getProducts());
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    if (loading) return <ActivityIndicator />;
    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}
            itemStyle={{ color: "white" }}
        >
            {itemsList}
        </Picker>
    );
}
