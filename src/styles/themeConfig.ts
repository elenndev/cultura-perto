import { createGlobalStyle} from "styled-components"

export const lightTheme = {
    body: '#FFFF',
    text: '#363537',
    toggleBorder: 'FFFF',
    background: '#363537',
}
export const darkTheme = {
    body: '#363537',
    text: 'FFFF',
    toggleBorder: '999',
    background: '#999',
}

export const GlobalStyles = createGlobalStyle`
    body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
}
`