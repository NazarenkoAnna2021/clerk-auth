import { TColors } from "@/UIProvider/theme/IColorTheme";
import { scaleHorizontal, scaleVertical, scaleFontSize } from "@/Utils";
import { StyleSheet } from "react-native";

export const getStyles = (colors: TColors) => (StyleSheet.create(
    {
        container_main: {
        },
        container_password: {
        },
        inputWrapper: {
            justifyContent: 'center',
            backgroundColor: colors.card,
            borderRadius: scaleHorizontal(6),
        },
        input_main: {
            height: scaleVertical(40),
            fontSize: scaleFontSize(14),
            color: colors.foreground,
            paddingHorizontal: scaleHorizontal(9),
            borderWidth: scaleVertical(2),
            borderColor: colors.foreground,
            borderRadius: scaleHorizontal(6),
        },
        input_password: {
            height: scaleVertical(40),
            fontSize: scaleFontSize(14),
            color: colors.foreground,
            paddingHorizontal: scaleHorizontal(9),
            borderWidth: scaleVertical(2),
            paddingRight: scaleHorizontal(48),
            borderColor: colors.foreground,
            borderRadius: scaleHorizontal(6),
        },
        errorText: {
            fontSize: scaleFontSize(12),
            color: colors.destructive,
            marginTop: scaleVertical(4)
        },
        secureTextButton: {
            position: 'absolute',
            right: scaleHorizontal(16)
        },
        placeholder: {
            position: 'absolute',
            fontSize: scaleFontSize(14),
            color: colors.grey,
            paddingHorizontal: scaleHorizontal(10),
            overflow: 'visible',
        },
    }

));