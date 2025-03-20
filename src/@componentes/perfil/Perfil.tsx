'use client'
import { TypePerfilArtistico } from "@/types"
import Agenda from "./Agenda";

interface perfilProps {
    perfil: TypePerfilArtistico;
}
export function Perfil(props : perfilProps){
    const {perfil} = props
    return(<>
        <p>@{perfil.nome}</p>
        <p>{perfil.descricao}</p>
        <Agenda/>
    </>)
}