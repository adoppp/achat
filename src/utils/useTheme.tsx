import type { Theme } from "@/types";
import { useEffect, useState } from "react";

export const useTheme = () => {
    const [currentTheme, setCurrentTheme] = useState<Theme | null>(null); 
    const html = document.documentElement;

    const setTheme = (theme: Theme) => {
        if (!theme) return;
        
        html.setAttribute('data-theme', theme);
        localStorage.setItem('achat-theme', theme);
        setCurrentTheme(theme);
    };

    useEffect(() => {
        const localStorageTheme = localStorage.getItem('achat-theme') as Theme;

        if (!localStorageTheme) return;

        html.setAttribute('data-theme', localStorageTheme);

        const htmlTheme = html.getAttribute('data-theme') as Theme;
        setCurrentTheme(htmlTheme);
    });

    return { setTheme, currentTheme };
};