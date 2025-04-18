import { useState, useEffect } from "react";
import axios from "axios";
import { Cidade, Estado } from "@/types";
import * as S from '@/styles/Styles';

interface definirLocalidadeprops {
    estadoSelecionado: string;
    cidadeSelecionada: string;
    handleInformarLocalidade: (local: 'cidade' | 'estado', nome: string) => void;
}
export default function DefinirLocalidade(props: definirLocalidadeprops) {
    const [estados, setEstados] = useState<Estado[]>([]);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const {cidadeSelecionada,estadoSelecionado,handleInformarLocalidade} = props

    useEffect(() => {
    axios.get<Estado[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => setEstados(res.data.sort((a, b) => a.nome.localeCompare(b.nome))))
        .catch((err) => console.error("Erro ao buscar estados:", err));
    }, []);

    useEffect(() => {
    if (estadoSelecionado) {
        axios.get<Cidade[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`)
        .then((res) => setCidades(res.data))
        .catch((err) => console.error("Erro ao buscar cidades:", err));
    }
    }, [estadoSelecionado]);


    return (
        <div className='flex flex-col items-center gap-y-2 md:flex-row'>
            <S.InputSpan className='flex flex-col'>
                <label>Estado:</label>
                <select value={estadoSelecionado} onChange={(e) => handleInformarLocalidade('estado',e.target.value)}>
                    <option className='bg-white text-black' value="">Selecione um estado</option>
                    {estados.map((estado) => (
                    <option className='bg-white text-black' key={estado.id} value={estado.sigla}>
                        {estado.nome}
                    </option>
                    ))}
                </select>
            </S.InputSpan>

        <S.InputSpan className='flex flex-col'>
            <label>Cidade:</label>
            <select value={cidadeSelecionada} onChange={(e) => handleInformarLocalidade('cidade',e.target.value)} disabled={!estadoSelecionado}>
                <option className='bg-white text-black' value="">Selecione uma cidade</option>
                {cidades.map((cidade) => (
                <option className='bg-white text-black' key={cidade.id} value={cidade.nome}>
                    {cidade.nome}
                </option>
                ))}
            </select>
        </S.InputSpan>
        </div>
    );
}
