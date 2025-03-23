export type TypeEvento = {
    _id: string;
    nome: string;
    detalhes: string;
    data: Date;
    localidade: TypeLocalidadeEvento;
    linksEvento?: TypeLinkEvento[] 
}
export type TypeLinkEvento = {
    _id: string;
    nome: string;
    link: string;
}

export type TypeLocalidadeEvento = {
    nomeLocal: string; 
    bairro: string;
    rua: string;
    link: string;
}