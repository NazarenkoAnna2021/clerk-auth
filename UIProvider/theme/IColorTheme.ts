import { COLORS } from "./colorSchame";

export type TTheme = 'light' | 'dark';

export type TColors = typeof COLORS.light | typeof COLORS.dark;

export interface IColorTheme {
    theme: TTheme;
    colors: TColors;
    setTheme: (value: TTheme) => void;
};