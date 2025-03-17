import Modal from "./Modal";

export default function Modal_Loading(props: {content: string}){
    const {content} = props
    return(
        <Modal modalContent={{content, isLoadingModal: true}}/>
    )
}