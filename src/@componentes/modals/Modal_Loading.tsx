import { ModalHolder } from "@/styles/Styles";
import Loader from "../Loader";

export default function Modal_Loading(props: {content: string}){
    const {content} = props
    return(
        <ModalHolder>
            <div className=' flex flex-col items-center'>
                <p className='text-[1.85rem] mb-1'>{content}</p>
                <Loader size={'3rem'} />
            </div>
        </ModalHolder>
    )
}