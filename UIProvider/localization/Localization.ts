import { I18n } from 'i18n-js';
import { translations } from './Translations';
import { storage } from '../../lib/storage';
import { useEffect, useMemo, useState } from 'react';
import { TLocales } from './ILocalization';
import { getLocales } from 'expo-localization';

const i18n = new I18n();

export const useLocalization = () => {
    const [localizationStore, setLocalizationStore] = useState<TLocales>('en');
    const locales = useMemo(() => Object.keys(translations) as TLocales[], [translations]);

    useEffect(() => {
        i18n.enableFallback = true;
        i18n.translations = translations;
        load().then(() => setLanguageByDeviceLocale());
    }, []);

    const setLanguageByDeviceLocale = (defaultLocale: string = 'en') => {
        try {
            if (localizationStore) return;
            const deviceLocale = getLocales()?.[0]?.languageCode || '';
            const isLanguageIncludes = locales;
            if (isLanguageIncludes && deviceLocale) {
                setLocale(deviceLocale);
                return;
            };
            setLocale(defaultLocale);
        } catch (error) {
            console.warn('Localization -> setLanguageByDeviceLocale: ', error);
        };
    };

    const load = async () => {
        storage.get('LANGUAGE')
            .then(data => { data && (setLocalizationStore(data)) })
            .catch(error => console.warn('Localization -> load: ', error));
        storage.get('TRANSLATIONS')
            .then(data => { data && (i18n.translations = data) })
            .catch(error => console.warn('Localization:TRANSLATIONS -> load: ', error));
    };

    const persistLanguage = (data: string | null) => {
        if (!data) {
            storage.remove('LANGUAGE');
            return;
        };
        storage.set('LANGUAGE', data);
    };

    const persistTranslations = (data: object) => {
        if (!data) return;
        storage.set('TRANSLATIONS', data);
    };

    const setTranslation = (translations: any) => {
        if (typeof translations === 'object' && translations) {
            i18n.translations = translations;
            persistTranslations(translations);
        };
    };

    const t = (key: string) => {
        const locale = localizationStore;
        return i18n.t(key, { locale: locale });
    };

    const setLocale = (locale: string) => {
        setLocalizationStore(locale as TLocales);
        persistLanguage(locale);
    };

    return {
        locale: localizationStore,
        locales,
        setLocale,
        setTranslation,
        t,
    };
};