import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type FC,
    type ReactNode,
} from 'react';

export type ThemeMode = 'light' | 'dark';
export type AccentPalette = 'blue' | 'lavender' | 'red' | 'purple' | 'green' | 'orange' | 'teal';
export type SurfaceMode = 'neutral' | 'accent';

export interface ThemeContextType {
    theme: ThemeMode;
    accent: AccentPalette;
    surface: SurfaceMode;
    setTheme: (value: ThemeMode) => void;
    setAccent: (value: AccentPalette) => void;
    setSurface: (value: SurfaceMode) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const STORAGE_THEME_KEY = 'achatx_theme';
const STORAGE_ACCENT_KEY = 'achatx_accent';
const STORAGE_SURFACE_KEY = 'achatx_surface';

const DEFAULT_THEME: ThemeMode = 'light';
const DEFAULT_ACCENT: AccentPalette = 'blue';
const DEFAULT_SURFACE: SurfaceMode = 'neutral';

const getInitialTheme = (): ThemeMode => {
    if (typeof window === 'undefined') {
        return DEFAULT_THEME;
    }

    const storedTheme = window.localStorage.getItem(STORAGE_THEME_KEY) as ThemeMode | null;
    return storedTheme === 'dark' ? 'dark' : DEFAULT_THEME;
};

const getInitialAccent = (): AccentPalette => {
    if (typeof window === 'undefined') {
        return DEFAULT_ACCENT;
    }

    const storedAccent = window.localStorage.getItem(STORAGE_ACCENT_KEY) as AccentPalette | null;
    return storedAccent ?? DEFAULT_ACCENT;
};

const getInitialSurface = (): SurfaceMode => {
    if (typeof window === 'undefined') {
        return DEFAULT_SURFACE;
    }

    const storedSurface = window.localStorage.getItem(STORAGE_SURFACE_KEY) as SurfaceMode | null;
    if (storedSurface === 'accent') {
        return 'accent';
    }

    if (storedSurface === 'neutral') {
        return 'neutral';
    }

    return DEFAULT_SURFACE;
};

const updateDocumentAttributes = (
    theme: ThemeMode,
    accent: AccentPalette,
    surface: SurfaceMode,
) => {
    if (typeof document === 'undefined') {
        return;
    }

    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-accent', accent);
    document.documentElement.setAttribute('data-surface', surface);
};

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);
    const [accent, setAccentState] = useState<AccentPalette>(getInitialAccent);
    const [surface, setSurfaceState] = useState<SurfaceMode>(getInitialSurface);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        localStorage.setItem(STORAGE_THEME_KEY, theme);
        localStorage.setItem(STORAGE_ACCENT_KEY, accent);
        localStorage.setItem(STORAGE_SURFACE_KEY, surface);

        updateDocumentAttributes(theme, accent, surface);
    }, [theme, accent, surface]);

    const value = useMemo(
        () => ({
            theme,
            accent,
            surface,
            setTheme: (value: ThemeMode) => setThemeState(value),
            setAccent: (value: AccentPalette) => setAccentState(value),
            setSurface: (value: SurfaceMode) => setSurfaceState(value),
            toggleTheme: () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark')),
        }),
        [theme, accent, surface],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used inside ThemeProvider');
    }

    return context;
};
