import React from "react";
import { render } from "@testing-library/react-native";

import DeliveryList from "../components/DeliveryList";

const products = [
    { name: "Shampoo", stock: 2 },
    { name: "Balsam", stock: 3 },
    { name: "Soap", stock: 15 },
];

const setProducts = () => false;

test("List should contain three items", async () => {
    const { getByText, debug } = render(<DeliveryList products={products} setProducts={setProducts} />);

    //debug("DeliveryList component");

    const shampoo = await getByText("Shampoo", { exact: false });
    const balsam = await getByText("Balsam", { exact: false });
    const soap = await getByText("Soap", { exact: false });

    expect(shampoo).toBeDefined();
    expect(balsam).toBeDefined();
    expect(soap).toBeDefined();
});
