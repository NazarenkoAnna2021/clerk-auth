export interface ILocalization {
    readonly locales: TLocales[];
    readonly locale: TLocales;
    t: (key: string) => string;
    setTranslation: (translations: any) => void;
    setLocale: (value: string) => void;
};

export type TLocales = 'en'