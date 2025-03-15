'use client'
import { useThemeContext } from '@/context/ContextTheme';
import { darkTheme, GlobalStyles, lightTheme } from '@/styles/themeConfig';
import { ThemeProvider} from 'styled-components';
import { ThemeToggleButton } from '..';
import { Button_LogOut } from '../Button_LogOut';

export const Homepage = ()=>{
    const { theme } = useThemeContext();
    
    const currentTheme = theme === 'light' ? lightTheme : darkTheme;
    
    return (
    <ThemeProvider theme={currentTheme}>
        <GlobalStyles/>
        <div>
        <ThemeToggleButton />
        <Button_LogOut />
        </div>
    </ThemeProvider>
    );
}