import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
interface iconRedeSocialProps {
    nome: string;
}
export default function IconeRedeSocial(props: iconRedeSocialProps){
    switch (props.nome){
        case 'instagram':
            return (<FaInstagram />)
        break;
        case 'facebook':
            return (<FaFacebookF/>)
        break;
        case 'tiktok':
            return (<FaTiktok />)
        break;
        case 'x':
            return (<FaXTwitter />)
        break;
}       
}