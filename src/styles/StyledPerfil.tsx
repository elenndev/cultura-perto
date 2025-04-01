import styled  from 'styled-components'

export const PerfilHeader = styled.div`
    width: 100%;
    height:100%;
    content: none;
    z-index: 1;
    position: absolute;
    overflow-x: hidden;
    background: rgb(27,38,50);
    background: linear-gradient(0deg, rgba(27,38,50,1) 0%, rgba(44,59,77,1) 41%, rgba(163,81,57,1) 72%, rgba(213,116,48,1) 100%);
`

export const PerfilAgenda = styled.div`
    position: relative;
    &::before, &::after{
        position: absolute;
        content: "";
        height: 1px;
        border-top: solid #c9c1b1 2px;
        border-radius: 1rem;
    }
    &::before{
        width: 50%;
        top: 0;
    }
    &::after{
        width: 30%;
        bottom: 0;
    }
`
export const DegradeCardPerfil = styled.span`
    border-bottom-left-radius: 1.5rem;
    border-top-left-radius: 1.5rem;
    background: #2c3b4d;
    background: linear-gradient(90deg, rgba(163,81,57,1) 0%, rgba(27,38,50,1) 52%, #2c3b4d 100%);
    transition: background 0.3s ease-in-out,width 0.3s ease-in-out;

`;
export const CardPerfil = styled.div`
    transition: width 0.3s ease-in-out;
    &:hover{
        background: #1b2632;
        .cardPerfilDegrade{
            background: linear-gradient(90deg, rgba(163,81,57,1) 0%, rgba(27,38,50,1) 100%);
            width: 70%;
            border-bottom-right-radius: 1.5rem;
            border-top-right-radius: 1.5rem;
        }
    }
`

