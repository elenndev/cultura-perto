'use client'
import { useThemeContext } from '@/context/ContextTheme';
import { darkTheme, GlobalStyles, lightTheme } from '@/styles/themeConfig';
import { ThemeProvider} from 'styled-components';
import { ThemeToggleButton } from '..';
import { Button_LogOut } from '../Button_LogOut';


type homepageProps<S> = {
    userSession: S | null;
}
export const Homepage = <S,>({userSession} : homepageProps<S> )=>{
    const { theme } = useThemeContext();
    console.log('user no componente Homepage:', userSession)
    
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