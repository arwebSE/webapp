import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Button, View } from "react-native";

export default function DateDropdown(props) {
    const [dropdownDate, setDropdownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropdownDate(date);

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropdownDate}
                />
            )}
        </View>
    );
}
