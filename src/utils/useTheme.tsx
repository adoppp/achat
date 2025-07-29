import type { Theme } from "@/types";
import { useEffect, useState } from "react";

export const useTheme = () => {
    const localStorageTheme = localStorage.getItem('theme') as Theme;
    const html = document.documentElement;
    const [currentTheme, setCurrentTheme] = useState<Theme | null>(null); 

    const setTheme = (theme: Theme) => {
        if (!theme) return;
        
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        setCurrentTheme(theme);
    };

    useEffect(() => {
        if (!localStorageTheme) return;

        html.setAttribute('data-theme', localStorageTheme);

        const htmlTheme = html.getAttribute('data-theme') as Theme;
        setCurrentTheme(htmlTheme);
    });

    return { setTheme, currentTheme };
};