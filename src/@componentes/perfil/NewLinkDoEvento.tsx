'use client'
import { TypeLinkEvento } from "@/types"
import { useState } from "react";

interface linkDoEventoProps{
    linkEvento: (TypeLinkEvento & {id: string}); 
    salvarLink: (link: TypeLinkEvento & {id: string}) => void;
    cancelar: () => void;
}
export default function NewLinkDoEvento(props: linkDoEventoProps){
    const {salvarLink} = props
    const [nome, setNome] = useState(props.linkEvento.nome)
    const [link, setLink] = useState(props.linkEvento.link)
    const [erro, setErro] = useState(false)

    function handleAdicionarLink(){
        if(nome == ""  && link == ""){
            setErro(true)
        } else {
            salvarLink({nome, link, id: props.linkEvento.id})
        }
    }

    return (<div className="adicionarLink flex flex-col">
        <span className="flex flex-wrap flex-row">
            <label htmlFor='nomeLink'>Nome do link <i>{'Exemplo: "Website do evento", "Confirmar presença", "Comprar ingresso"'}</i></label>
            <input type="text" name='nomeLink' placeholder="Nome"
            value={nome}
            onChange={(e) => {if(erro){setErro(false)};setNome(e.target.value)}}></input>
            
            <label htmlFor='link'>Link</label>
            <input type="url" name='link' placeholder="Link"
            value={link}
            onChange={(e)=> {if(erro){setErro(false)};setLink(e.target.value)}}></input>
        </span>

        {erro && (<p className="w-full text-red-500">Informe o nome do link e o link do evento</p>)}

        {link.length > 5 && nome != '' && (
            <button type='button' onClick={()=> handleAdicionarLink()}>Salvar link</button>
        )}
        <button type='button' onClick={()=> props.cancelar()}>Cancelar</button>
    </div>)
}