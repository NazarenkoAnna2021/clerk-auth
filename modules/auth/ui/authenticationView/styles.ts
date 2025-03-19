import { scaleHorizontal, scaleVertical } from "@/Utils";
import { StyleSheet } from "react-native";

export const getStyles = () => (StyleSheet.create({
    button: {
        marginHorizontal: scaleHorizontal(20),
        marginBottom:scaleVertical(10)
    },
}));