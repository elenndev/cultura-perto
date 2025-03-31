import { InputSpan } from "@/styles/StyledEditarPerfil";
import { Dispatch, SetStateAction } from "react";

interface editarLinksPerfilProps{
    setError: (erro: string) => void;
    link: {nome: string, url: string}
    setLinks: Dispatch<SetStateAction<{
        Instagram: string;
        Facebook: string;
        X: string;
        Spotify: string;
        Soundcloud: string;
        Youtube: string;
        LinkExterno: string;
    }>>;
}
export default function EditarLinkPerfil(props: editarLinksPerfilProps){
    const {link} = props
    return(<>
        <InputSpan className={link.nome}>
            <label htmlFor={link.nome}>{link.nome}</label>
                <input
                name={link.nome}
                type="text"
                placeholder={`Adicionar link do seu perfil do ${link.nome}`}
                defaultValue={link.url}
                onChange={(e) => {
                    props.setError("");
                    props.setLinks((prevLinks) => ({
                        ...prevLinks,
                        [link.nome]: e.target.value,
                    }));
                }}
            />
        </InputSpan>
    </>
    )
}