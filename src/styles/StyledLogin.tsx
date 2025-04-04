export * from './Styles'
import styled from 'styled-components'

export const Form = styled.form`
    justify-content: center;
    align-items: center;
    color: white;

`

export const FormInput =styled.div`
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;    
    label{
        display: block;
        font-size: 0.875rem;
        font-weight: 600;
    }
    input{
        width: 100%;
        border: solid 1px white;
        border-radius: 0.375rem;
        padding: 0.75rem;
    }
`

export const TextoErro = styled.span`
    width: 100%;
    text-align: center;
    p{
        background: #ff8077;
        padding: 0 2rem;
        border-radius: 2rem;
    }
`