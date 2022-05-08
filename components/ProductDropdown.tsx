import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator } from "react-native";

import productModel from "../models/products";

export default function ProductDropDown(props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    const fetchProducts = async () => {
        setLoading(true);
        const products = await productModel.getProducts();
        setProducts(products);
        const newDelivery = { ...props.delivery, product_id: products[0].id };
        props.setDelivery(newDelivery);
        props.setCurrentProduct(products[0]);
        setLoading(false);
    };

    useEffect(() => {
        if (props.wait) {
            console.log("waiting...");
        } else if (!props.wait) {
            console.log("props.wait is false!");
            fetchProducts();
        }
    }, [props.wait]);

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
