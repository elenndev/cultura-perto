import styled from 'styled-components'
export * from './Styles'

export const AreaPreviaPerfil = styled.div`
    display: flex;
    position: relative;
    width: fit-content;
    align-items: center;
    flex-direction: column;
    .icon{display: none;}
    .editando{
        border: solid 2px white;
        .icon{ 
            display:block;
            opacity: 1;
        }
    }

`
    export const Tag = styled.span`
        background: #ffb162;
        color: #1b2632;
        padding: 2px 15px;
        display: flex;
        width: fit-content;
        flex-direction: row;
        align-items: center;
        border-radius: 1rem;
        cursor: pointer;
        .icon{
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }
        &:hover .icon{
            opacity: 1;
        }
    `

