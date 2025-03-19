import { scaleHorizontal, scaleVertical } from "@/Utils";
import { StyleSheet } from "react-native";

export const getStyles = () => (StyleSheet.create({
    input: {
        marginBottom: scaleVertical(10),
        marginHorizontal: scaleHorizontal(20)
    },
    button: {
        marginHorizontal: scaleHorizontal(20),
        marginBottom:scaleVertical(10)
    },
}));