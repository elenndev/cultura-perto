import { TypeEvento } from "./TypeEvento";

export type TypePerfilArtistico = {
    _id: string;
    icon?: string;
    nome: string;
    username: string;
    descricao: string;
    tipo: 'grupo' | 'individual';
    area: 'musica' | 'cenica' | 'artesanato/artes visuais';
    linksDoPerfil: TypeLinksPerfil[];
    localidade: TypeLocalidadePerfil;
    agenda: null | TypeEvento[]
}

export type TypeLinksPerfil = {
    nome: 'Instagram' | 'X' | 'Facebook' | 'Tiktok'; 
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