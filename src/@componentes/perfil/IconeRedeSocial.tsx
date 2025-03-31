import { FaInstagram, FaFacebookF, FaYoutube, FaSoundcloud, FaSpotify } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
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
        case 'youtube':
            return (<FaYoutube/>)
        break;
        case 'soundcloud':
            return (<FaSoundcloud/>)
        break
        case 'spotify':
            return (<FaSpotify/>)
        default:
            return (<CiGlobe />)
}       
}