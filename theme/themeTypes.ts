interface ThemeColors {
    primary: string;
    gray: string;
    lightGray: string;
    neutral: string;
    blue: string;
    lightBlue: string;
    green: string;
    yellow: string;
}

interface ThemeFontStyle {
    interBlack: string;
    interBold: string;
    interExtraBold: string;
    interExtralight: string;
    interLight: string;
    interMedium: string;
    interRegular: string;
    interSemibold: string;
    interThin: string;
}

interface ThemeFontSize {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
}

export interface Theme {
    colors: ThemeColors;
    fontStyle: ThemeFontStyle;
    fontSize: ThemeFontSize;
}

export interface themeType {
    light: Theme;
    dark: Theme;
}
