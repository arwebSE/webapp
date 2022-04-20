import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Platform, Button, View } from "react-native";

export default function DateDropdown(props) {
    const [dropdownDate, setDropdownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    useEffect(() => {
        const date = new Date();
        props.setDelivery({
            ...props.delivery,
            delivery_date: date.toLocaleDateString("se-SV"),
        });
    }, []);

    return (
        <View>
            {Platform.OS === "android" && <Button onPress={showDatePicker} title="Show date picker" />}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropdownDate(date);
                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString("se-SV"),
                        });
                        setShow(false);
                    }}
                    value={dropdownDate}
                    themeVariant="dark"
                />
            )}
        </View>
    );
}