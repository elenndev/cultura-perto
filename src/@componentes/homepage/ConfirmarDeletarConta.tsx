'use client'
import Modal from "../modals/Modal";
import * as S from "@/styles/Styles"

interface confirmarDeletarContaProps {
    confirmar: (confirmado: boolean) => void;
}
export default function ConfirmarDeletarConta(props: confirmarDeletarContaProps){
    return (
        <Modal modalContent={{
            content:  "Você tem certeza que deseja deletar a conta?",
            details: "Tanto a conta quanto o perfil artístico vinculado a ela serão deletados"}}>
            <span className="flex flex-row gap-x-2">
                <S.Button_Danger type='button' onClick={()=> props.confirmar(false)}>Cancelar</S.Button_Danger>
                <S.Button_OK type='button' onClick={()=> props.confirmar(true)}>Sim, entendi e quero prosseguir</S.Button_OK>
            </span>
        </Modal>
    )
}