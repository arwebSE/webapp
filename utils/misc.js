import Toast from "react-native-root-toast";

const toast = (msg) => {
    Toast.show(msg, {
        duration: Toast.durations.LONG,
        position: 100,
        backgroundColor: "white",
        textColor: "black",
        opacity: 0.9,
    });
};

export { toast };
