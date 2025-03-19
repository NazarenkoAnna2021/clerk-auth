import { FC, useMemo, useState } from "react";
import { View, ViewStyle } from "react-native";
import { Text } from "../nativewindui/Text";
import { Link, LinkProps } from "expo-router";
import { getStyles } from "./styles";
import { useColorScheme } from "nativewind";
import { useUiContext } from "@/UIProvider";

interface IProps extends LinkProps {
    title?: string;
    linkText: string;
    containerStyle?: ViewStyle;
};

export const MainLink: FC<IProps> = ({ title, linkText, containerStyle, ...props }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const [opacity, setOpacity] = useState(1);

    const onPressIn = () => {
        setOpacity(0.5);
    };

    const onPressOut = () => {
        setOpacity(1);
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {title && <Text>{title}</Text>}
            <Link onPressIn={onPressIn} onPressOut={onPressOut} {...props}>
                <Text style={{ color: colors.primary, opacity }}>{linkText}</Text>
            </Link>
        </View>
    );
};