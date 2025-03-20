import { TypeLocalidadePerfil } from "./TypePerfilArtistico";

export type TypeEvento = {
    nome: string;
    detalhes: string;
    datas: Date[];
    localidade: TypeLocalidadePerfil;
    linksEvento: TypeLinkEvento[]
}

type TypeLinkEvento = {
    nome: 'localizacao ' | string;
    link: string;
}