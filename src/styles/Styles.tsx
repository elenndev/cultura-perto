import styled, { keyframes } from 'styled-components'

export const H2 = styled.p`
    font-size: 1.5rem;
`
export const H1 = styled.p`
    font-size: 2.25rem;
`
export const Menu = styled.span`
    .link{
        background: #1b2632;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
    }
`

export const ContainerHolder = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3rem;
    border: solid 2px #ffb162;
    .container{
        border-radius: 3rem;
        background: #2c3b4d;
        box-shadow: 0 0 10px -5px #00000076;
    }
    .logo{
        box-shadow: 0 0 20px -3px #00000076;
        border-radius: 50%;
        object-fit: "contain"
    }
`

export const Button = styled.button`
    width: fit-content;
    color: black;
    padding: 2px 15px;
    border-radius: 0.5rem;
    cursor: pointer;
`;
export const Button_Danger = styled(Button)`
    background: #ff8077;
`
export const Button_OK = styled(Button)`
    background: #96f869;
`;

export const Button_Principal = styled(Button)`
    background: #ffb162;
    color: #1b2632;
    transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
    &:hover{
        background: #a35139;
        color: white;
    }
`
export const Button_Secundario = styled(Button)`
    background: #c9c1b1;
    color: #1b2632;
    `

export const Button_Adicional = styled(Button)`
    background: #a35139;
    color: white;
`


export const ModalHolder = styled.div`
    position: absolute;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #00000083;
    backdrop-filter: blur(10px);
    `;
export const ModalContainer = styled.div`
    background: white;
    color: black;
    display: flex;
    flex-direction: column;
    border-radius: 2rem;
    `;
    export const ModalHeader = styled.div`
        width: 100%;
        background: #2c3b4d;
        color: white;
        overflow: hidden;
        border-top-right-radius: 2rem;
        border-top-left-radius: 2rem;
        justify-content: center;
        padding: 0.85rem 0;
        display: flex;
        font-weight: bold;
        height: fit-content;
        `;
        export const ModalBody = styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        height: fit-content;
        padding: 1rem;
        `;
        export const ModalContent = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: fit-content;
        padding: 0 1.5rem;
    `;

export const TBody = styled.tbody`
    &:not(:last-child){
        border-right: 1px solid white;
    }
`;
    export const TR = styled.tr`
        border-bottom: 1px solid white;
        `
    export const TD = styled.td`
        padding: 5px; 
        word-wrap: break-word;
        justify-content: center;
        overflow-wrap: break-word;
        white-space: normal;
        hyphens: auto;
        
    `
    export const TH = styled.th`
        background: #EEE9DF;
        color: #0a2538;
        border: none;
        &:not(:last-child){
            border-right: 1px solid #0000003d;
        }
    `

export const InputSpan = styled.span`
        display: flex;
        flex-direction: column;
        overflow: wrap;
        gap: 0.75rem 0;
        border-radius: 0.5rem;
        label{
            margin-right: 5px;
        }
        input{
            border-radius: 0.5rem;
            padding: 0 5px;
            border: solid 1px #c9c1b1;
            background: white;
        }
`
interface MultiplasTelasIndicadorProps {
    $tela?: string;
}
export const MultiplastTelasIndicador = styled.span<MultiplasTelasIndicadorProps>`
    --tamanho: 1rem;
    content: 'none';
    background: ${({ $tela }) => ($tela === "on" ? '#2c3b4d' : 'transparent')};
    border: ${({ $tela }) => ($tela === "on" ? 'none' : 'solid 2px #2c3b4d')};
    border-radius: 50%;
    width: var(--tamanho);
    height: var(--tamanho);
`;

export const SelecionarOpcoes = styled.div`
    button{
        background: #eee9df;
        opacity: 0.5;
    }
    button.selecionado{
        opacity: 1;
        border: solid 2px #0a2538;
    }
`

export const rotate = keyframes`
    100% {
        transform: rotate(360deg);
    }
`

export const dash = keyframes`
    0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
    }
    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
    }
`

export const LoaderSVG = styled.svg`
    animation: ${rotate} 2s linear infinite;

    circle {
    animation: ${dash} 1.5s ease-in-out infinite;
    }
`


