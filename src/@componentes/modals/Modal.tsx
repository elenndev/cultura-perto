'use client'
import *  as S from '@/styles/Styles'
import React from 'react';

type modalProps = {
    modalContent: {
        title?: string;
        content: string;
        details?: string;
        isLoadingModal?: boolean;
    }
    children?: React.ReactNode;
    extendContent?: React.ReactNode;
}


export default function Modal({modalContent, children, extendContent}: modalProps){
    return(<>
        <S.ModalHolder>
            <S.ModalContainer>
                {modalContent.title && (
                    <S.ModalHeader>
                        <p>{modalContent.title}</p>
                    </S.ModalHeader>
                )}
                <S.ModalBody>
                    <S.ModalContent>
                        <p>{modalContent.content}</p>
                    </S.ModalContent>
                    {modalContent.details && (<>
                    <S.ModalContent>
                        <p>{modalContent.details}</p>
                    </S.ModalContent>
                    </>)}
                    <S.ModalContent>{children}</S.ModalContent>
                    {extendContent}
                    {modalContent.isLoadingModal && (<p>{"Carregando....'[trocar esse texto por animação]'"}</p>)}
                </S.ModalBody>
            </S.ModalContainer>
        </S.ModalHolder>
    </>)
}