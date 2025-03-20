import { scaleHorizontal, scaleVertical } from "@/Utils";
import { StyleSheet } from "react-native";

export const getStyles = () => (StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scaleHorizontal(24),
        padding: scaleVertical(10),
        borderBottomWidth: 1,
    },
    addPhoneWrapper: {
        paddingHorizontal: scaleHorizontal(24),
        paddingVertical: scaleVertical(20),
    },
    input: {
        marginBottom: scaleVertical(20),
    },
    button: {
        marginHorizontal: scaleHorizontal(24),
        marginBottom:scaleVertical(20)
    }
}));