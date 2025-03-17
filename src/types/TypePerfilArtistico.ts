import { TypeEvento } from "./TypeEvento";

export type TypePerfilArtistico = {
    _id: string;
    icon?: string;
    nome: string;
    descricao: string;
    tipo: 'grupo' | 'individual';
    area: 'musica' | 'cenica' | 'artesanato';
    linksDoPerfil: TypeLinksPerfil[];
    localidade: {
        localidadePrincipal: TypeLocalidadePerfil;
    }
    agenda: null | TypeEvento[]
}

export type TypeLinksPerfil = {
    nome: 'Spotify' | 'Instagram' | 'X' | 'Facebook' | 'Youtube' | 'Soundcloud' | {outro: {nome: string}}; 
    link: string;
}

export type TypeLocalidadePerfil = {
    cidade: string;
    estado: string;
}

export type Estado = {
    id: number;
    sigla: string;
    nome: string;
};

export type Cidade = {
    id: number;
    nome: string;   
};