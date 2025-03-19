'use client'
import { TypePerfilArtistico } from "@/types"
// import { useState } from "react"

interface perfilProps {
    perfil: TypePerfilArtistico;
}
export function Perfil(props : perfilProps){
    const {perfil} = props
    return(<>
        <p>{perfil.nome}</p>
        <p>{perfil.descricao}</p>
    </>)
}