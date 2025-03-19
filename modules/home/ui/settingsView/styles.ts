import { scaleHorizontal } from "@/Utils";
import { StyleSheet } from "react-native";

export const getStyles = () => (StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:scaleHorizontal(24),
    },
}));