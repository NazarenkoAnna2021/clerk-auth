import { TColors } from '@/UIProvider/theme/IColorTheme';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: TColors) => {
    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center'
        },
    });
    return styles;
}
