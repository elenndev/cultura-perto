import { TypeEvento } from "./TypeEvento";

export type TypePerfilArtistico = {
    _id: string;
    icon?: string;
    nome: string;
    descricao: string;
    tipo: 'banda/grupo' | 'artista';
    area: 'musica' | 'teatro';
    linksDoPerfil: TypeLinksPerfil[];
    localidade: {
        localidadePrincipal: TypeLocalidadePerfil;
    }
    agenda: null | TypeEvento[]
}

type TypeLinksPerfil = {
    nome: 'Spotify' | 'Instagram' | 'X' | 'Facebook' | 'Youtube' | 'Soundcloud' | {outro: {nome: string}}; 
    link: string;
}

export type TypeLocalidadePerfil = {
    cidade: string;
    estado: string;
    link: string;
}
