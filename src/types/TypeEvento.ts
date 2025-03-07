import { TypeLocalidadePerfil } from "./TypePerfilArtistico";

export type TypeEvento = {
    nome: string;
    detalhes: string;
    data: string[];
    localidade: TypeLocalidadePerfil[];
    linksEvento: TypeLinkEvento[]
}

type TypeLinkEvento = {
    nome: string;
    link: string;
}