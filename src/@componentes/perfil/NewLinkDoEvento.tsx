'use client'
import { TypeLinkEvento } from "@/types"
import { Dispatch, SetStateAction } from "react";
import  {  InputSpan  } from '@/styles/Styles'

interface linkDoEventoProps{
    linkEvento: TypeLinkEvento;
    setLinksEvento: Dispatch<SetStateAction<TypeLinkEvento[]>>;
}
export default function NewLinkDoEvento(props: linkDoEventoProps){
    const {setLinksEvento, linkEvento} = props

    return (<div className="adicionarLink items-center flex flex-col bg-[#eee9df] border-[#ffb162] border-2 rounded-3xl p-2">
        <InputSpan className='bg-[white] rounded-3xl px-2'>
            <label htmlFor='nomeLink' className='flex flex-wrap max-w-[90%]'>Nome do link</label>
            <input type="text" name='nomeLink' placeholder="Nome do link" title='Nome do que o link se refere, exemplo "Website do evento", "Confirmar presença" "Comprar ingresso"'
            value={linkEvento.nome}
            onChange={(e) => {setLinksEvento(prev =>{
                if(prev){
                    const listaAtualizada = prev.map(item =>{ 
                        if(item._id == linkEvento._id){
                            item.nome = e.target.value
                        }
                        return item
                    })
                    return listaAtualizada
                }else {return prev}
            })}}></input>
        </InputSpan>
        
        <InputSpan className='bg-[white] rounded-3xl px-2'>
            <label htmlFor='link'>Link</label>
            <input type="url" name='link' placeholder="Link"
            value={linkEvento.link}
            onChange={(e)=> {setLinksEvento(prev =>{
                if(prev){
                    const listaAtualizada = prev.map(item =>{ 
                        if(item._id == linkEvento._id){
                            item.link = e.target.value
                        }
                        return item
                    })
                    return listaAtualizada
                }else {return prev}
            })}}></input>
        </InputSpan>
        
    </div>)
}