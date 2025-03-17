import styled from 'styled-components'

export const Button = styled.button`
    width: fit-content;
    color: black;
    padding: 2px 5px;
    border-radius: 0.5rem;
`;
export const Button_Danger = styled(Button)`
    background: red;
`
export const Button_OK = styled(Button)`
    background: green;
`;


export const ModalHolder = styled.div`
    position: absolute;
    z-index: 999;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: gray;
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
    height: fit-content;
`;
export const ModalBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: fit-content;
`;
export const ModalContent = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    padding: 5px 10px;
`;
