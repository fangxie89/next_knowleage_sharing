import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { FC, PropsWithChildren } from "react";

export const ThemeProvider : FC<PropsWithChildren> = ({ children }) => {
    return (
        <NextThemeProvider
        attribute='data-theme'
        defaultTheme="system"
        enableSystem={true}
        storageKey="theme"
        >
            {children}
        </NextThemeProvider>
    )
}