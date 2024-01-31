import { createContext, useContext } from 'react';


type ThemeContext = {
    grip: boolean;
    setgrip: React.Dispatch<React.SetStateAction<boolean>>;
};

/*ContextProviding for Data*/
export const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export function useThemeContext() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
}
