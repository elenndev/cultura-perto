'use client'
import { useThemeContext } from "@/context/ContextTheme"

export const ThemeToggleButton = () =>{
    const {toggleTheme} = useThemeContext()
    return(<button type='button' onClick={toggleTheme}>Mudar tema</button>)
} 