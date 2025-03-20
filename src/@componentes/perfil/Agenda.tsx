'use client'
import { TypeEvento, TypeLocalidadePerfil } from "@/types";
import { nanoid } from "nanoid";
import { useState } from "react";
import JanelaEvento from "./JanelaEvento";
const data1 = new Date()
const data2 = new Date(2024, 2, 19)
const data3 = new Date(2025, 4, 19)
const links = [{nome: 'localizacao', link: '#'}, {nome: 'outro link', link: '#'}]
const exemplolocal: TypeLocalidadePerfil = {cidade: 'itumbiara', estado: 'GO'}

const propsAgenda: TypeEvento[] | null = [{
    datas: [data2, data1, data3],
    detalhes: 'exemplo detalhes evento',
    nome: 'exemplo nome evento',
    linksEvento: links,
    localidade: exemplolocal
}]
export default function Agenda(){
    const [eventoAberto, setEventoAberto] = useState<false | TypeEvento>(false)

    const dataAtual = new Date()
    let agenda: (TypeEvento & {id: string})[] | null = null
    if(propsAgenda){
        agenda = propsAgenda.map(evento =>{
            const datas = evento.datas.filter(data => data >= dataAtual)
            if(datas.length > 0){
                return{...evento,
                    datas: datas.sort((a, b) => a.getTime() - b.getTime()),
                    id: nanoid()
                }

            }
            return null
        }).filter((evento): evento is TypeEvento & { id: string } => evento !== null);
    }
    
    function abrirJanelaDoEvento(eventoId: string){
        const buscarEvento = agenda!.find(evento => evento.id == eventoId)
        if(buscarEvento){
            setEventoAberto(buscarEvento)
        }
    }

    function fecharJanelaEvento(){
        setEventoAberto(false)
    }

    return(<div className="agenda flex flex-col">
        <p>Agenda</p>
        {agenda ? (<>
            <table>
                <thead>
                    <tr>
                        <th>Evento</th>
                        <th>Data mais próxima</th>
                        <th>próxima data e cidade</th>
                        <th>Abrir</th>
                    </tr>
                </thead>
                <tbody>
                    {agenda.map(evento => (
                        <tr key={evento.id}>
                            <td>{evento.nome}</td>
                            <td>{evento.datas[0].toLocaleDateString()}</td>
                            <td className="flex flex-col">
                                {evento.datas[1] ? (<p>{evento.datas[1].toLocaleDateString()}</p>): (<p>Data única</p>)}
                                <p>{evento.localidade.cidade}</p>
                            </td>
                            <td><button type="button" onClick={()=> abrirJanelaDoEvento(evento.id)}>abrir</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {eventoAberto && (<JanelaEvento evento={eventoAberto} fecharJanela={fecharJanelaEvento}/>)}
        </>) : (<p>Nenhum evento no momento</p>)}
    </div>)
}