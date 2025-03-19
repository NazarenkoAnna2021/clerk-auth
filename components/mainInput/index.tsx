import React, { FC, memo, useMemo, useState } from "react";
import { TextInput, TextInputProps, Text, View, ViewStyle, TouchableOpacity, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { getStyles } from "./styles";
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { scaleVertical } from "@/Utils";
import { EyeIcon } from "@/assets/icons/EyeIcon";
import { useUiContext } from "@/UIProvider";

interface IProps extends TextInputProps {
    type?: 'main' | 'password';
    enableErrorMessage?: boolean;
    error?: string;
    LeadingAccessory?: React.ReactNode;
    TrailingAccessory?: React.ReactNode;
    containerStyle?: ViewStyle;
};

const initPlaceholderOffset = scaleVertical(10);
const withTexPlaceholderOffset = scaleVertical(4);
const initPlaceholderTextSize = scaleVertical(14);
const withTexPlaceholderTextSize = scaleVertical(12);

export const MainInput: FC<IProps> = memo(({ type = 'main', enableErrorMessage = false, error, LeadingAccessory, TrailingAccessory, containerStyle, secureTextEntry, placeholder, onChangeText, onFocus, onBlur, style, ...props }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const [localSecureTextEntry, setLocalSecureTextEntry] = useState(secureTextEntry);
    const placeholderOffset = useSharedValue(props.value?.length ? withTexPlaceholderOffset : initPlaceholderOffset);
    const placeholderTextSize = useSharedValue(props.value?.length ? withTexPlaceholderTextSize : initPlaceholderTextSize);
    const derivedTextSize = useDerivedValue(() => placeholderTextSize.value, [placeholderOffset.value]);
    const [isFocused, setIsFocused] = useState(false);

    const animatePlaceholderOnFocus = () => {
        placeholderOffset.value !== withTexPlaceholderOffset && (placeholderOffset.value = withTiming(withTexPlaceholderOffset, { duration: 300 }));
        placeholderTextSize.value !== withTexPlaceholderTextSize && (placeholderTextSize.value = withTiming(withTexPlaceholderTextSize, { duration: 300 }));
    }

    const animatePlaceholderOnBlur = () => {
        if (props?.value?.length === 0) {
            placeholderOffset.value !== initPlaceholderOffset && (placeholderOffset.value = withTiming(initPlaceholderOffset, { duration: 300 }));
            placeholderTextSize.value !== initPlaceholderTextSize && (placeholderTextSize.value = withTiming(initPlaceholderTextSize, { duration: 300 }));
        };
    };

    const onPlaceholderStyleChange = (text?: string) => {
        if (isFocused || text?.length) {
            placeholderOffset.value !== withTexPlaceholderOffset && (placeholderOffset.value = withTiming(withTexPlaceholderOffset, { duration: 300 }));
            placeholderTextSize.value !== withTexPlaceholderTextSize && (placeholderTextSize.value = withTiming(withTexPlaceholderTextSize, { duration: 300 }));
        } else if (text?.length === 0) {
            placeholderOffset.value !== initPlaceholderOffset && (placeholderOffset.value = withTiming(initPlaceholderOffset, { duration: 300 }));
            placeholderTextSize.value !== initPlaceholderTextSize && (placeholderTextSize.value = withTiming(initPlaceholderTextSize, { duration: 300 }));
        };
    };

    const handleOnChangeText = (text: string) => {
        onChangeText?.(text);
        onPlaceholderStyleChange(text)
    };

    const onSetLocalSecureTextEntry = () => {
        setLocalSecureTextEntry(prev => !prev);
    };

    const placeholderStyle = useAnimatedStyle(() => ({
        top: placeholderOffset.value,
        fontSize: derivedTextSize.value
    }));

    const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(true);
        onFocus?.(e);
        animatePlaceholderOnFocus();
    };
    const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(false);
        onBlur?.(e);
        animatePlaceholderOnBlur();
    };

    return (
        <View style={[styles[`container_${type}`], containerStyle]}>
            <View style={[styles.inputWrapper]}>
                <Animated.Text style={[styles.placeholder, placeholderStyle]}>{placeholder}</Animated.Text>
                <TextInput
                    {...props}
                    style={[styles[`input_${type}`], { borderColor: error?.length && !isFocused ? colors.destructive : colors.foreground, paddingTop: placeholder ? scaleVertical(11) : 0 }, style]}
                    onChangeText={handleOnChangeText}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    secureTextEntry={localSecureTextEntry}
                    selectionColor={colors.primary}
                />
                {type === 'password' &&
                    <TouchableOpacity style={styles.secureTextButton} onPress={onSetLocalSecureTextEntry}>
                        <EyeIcon isCrossed={localSecureTextEntry} />
                    </TouchableOpacity>
                }
            </View>
            {enableErrorMessage && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
});