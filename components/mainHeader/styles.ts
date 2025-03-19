import { StyleSheet } from "react-native";
import { scaleHorizontal } from "../../Utils";
import { TColors } from "@/UIProvider/theme/IColorTheme";

export const getStyles = (colors: TColors) => (StyleSheet.create(
    {
        container_main: {
            zIndex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: scaleHorizontal(48),
        },
        title_main: {
            zIndex:-1,
            flex: 1,
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
        },
        backButton: {
            width: scaleHorizontal(55),
            height: scaleHorizontal(48),
            borderRadius: 16
        },
    }
));