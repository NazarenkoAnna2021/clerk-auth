import React, { createContext, FC, useContext } from 'react';
import { ILocalization } from './localization/ILocalization';
import { useLocalization } from './localization/Localization';
import { IColorTheme } from './theme/IColorTheme';
import { useColorScheme } from './theme/useColorScheme';

export const UIContext = createContext<IColorTheme & ILocalization>({} as any);

export const useUiContext = () => { return useContext(UIContext) };

interface IProps {
    children: React.ReactNode;
};

export const UIProvider: FC<IProps> = ({ children }) => {
    const localization = useLocalization();
    const colorTheme = useColorScheme();

    const value: IColorTheme & ILocalization = {
        locales: localization.locales,
        colors: colorTheme.colors,
        setTheme: colorTheme.setColorScheme,
        theme: colorTheme.colorScheme,
        locale: localization.locale,
        setLocale: localization.setLocale,
        setTranslation: localization.setTranslation,
        t: localization.t,
    };

    return (
        <UIContext.Provider value={value}>
            {children}
        </UIContext.Provider>
    );
};