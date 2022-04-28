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
        const newDate = new Date();
        const dueDate = new Date(newDate.setMonth(newDate.getMonth() + 1));
        if (props.delivery) {
            console.log("detected as DELIVERY date picker");
            props.setDelivery({
                ...props.delivery,
                delivery_date: date.toLocaleDateString("se-SV"),
            });
        } else if (props.invoice) {
            console.log("detected as ORDER date picker");
            props.setInvoice({
                ...props.invoice,
                creation_date: date.toLocaleDateString("se-SV"),
                due_date: dueDate.toLocaleDateString("se-SV"),
            });
        }
    }, []);

    return (
        <View>
            {Platform.OS === "android" && <Button onPress={showDatePicker} title="Show date picker" />}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropdownDate(date);
                        if (props.delivery) {
                            props.setDelivery({
                                ...props.delivery,
                                delivery_date: date.toLocaleDateString("se-SV"),
                            });
                        } else if (props.invoice) {
                            const newDate = new Date(date);
                            const dueDate = new Date(newDate.setMonth(newDate.getMonth() + 1));
                            props.setInvoice({
                                ...props.invoice,
                                creation_date: date.toLocaleDateString("se-SV"),
                                due_date: dueDate.toLocaleDateString("se-SV"),
                            });
                        }
                        setShow(false);
                    }}
                    value={dropdownDate}
                    themeVariant="dark"
                />
            )}
        </View>
    );
}
