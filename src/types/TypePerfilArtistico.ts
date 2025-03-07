import { TypeEvento } from "./TypeEvento";

export type TypePerfilArtistico = {
    nome: string;
    descricao: string;
    tipo: 'banda/grupo' | 'artista';
    area: 'musica' | 'teatro';
    linksDoPerfil: TypeLinksPerfil[];
    localidades: {
        localidadePrincipal: TypeLocalidadePerfil;
        outrasLocalidades: TypeLocalidadePerfil[]
    }
    agenda: null | TypeEvento[]
}

type TypeLinksPerfil = {
    nome: string; link: string;
}

export type TypeLocalidadePerfil = {
    nome: string;
    link: string;
}
