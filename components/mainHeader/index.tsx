import { FC, memo, useMemo } from "react";
import { TextStyle, View, ViewProps } from "react-native";
import { getStyles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isIOS, scaleVertical } from "../../Utils";
import { Button } from "../nativewindui/Button";
import { Text } from "../nativewindui/Text";
import { ChevronIcon } from "@/assets/icons/ChevronIcon";
import { useColorScheme } from "nativewind";
import { useUiContext } from "@/UIProvider";

interface IProps extends ViewProps {
    type?: 'main';
    title?: string;
    LeadingAccessory?: React.ReactNode;
    TrailingAccessory?: React.ReactNode;
    onGoBack?: () => void;
    titleStyle?: TextStyle;
};

export const MainHeader: FC<IProps> = memo(({ type = 'main', title, LeadingAccessory, TrailingAccessory, onGoBack, style, titleStyle, ...props }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const safeAreaInsets = useSafeAreaInsets();

    return (
        <View style={[styles[`container_${type}`], { marginTop: isIOS ? safeAreaInsets.top : scaleVertical(10) }, style]}  {...props}>
            {!!onGoBack &&
                <Button variant={'plain'} onPress={onGoBack} style={styles.backButton} >
                    <ChevronIcon position={'LEFT'} color={colors.foreground} />
                </Button>
            }
            {LeadingAccessory}
            <Text style={styles[`title_${type}`]} variant={'largeTitle'}>{title}</Text>
            {TrailingAccessory}
        </View>
    )
});