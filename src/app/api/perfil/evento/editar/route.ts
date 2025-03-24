import { NextRequest, NextResponse } from "next/server";
import PerfilArtisticoDB from "../../../../../../models/profileModel";
import { connectMongoDB } from "../../../../../../lib/db";

export async function POST(request: NextRequest){
    try {
        const {evento} = await request.json()
        if(!evento){
            throw new Error('Parâmetros necessários não encontrados na requisição')
        }

        await connectMongoDB()

        const {eventoId, username, ...eventoAlterado} = evento
        const perfil = await PerfilArtisticoDB.findOne({username: username})
        const _id = perfil._id

        console.log('itens separados','eventId:',eventoId, 'username', username,'resto que é o evento:', eventoAlterado)


        if(!perfil){
            throw new Error()
        }


        const eventoEditado = await PerfilArtisticoDB.findByIdAndUpdate(
                    {_id, "agenda._id": eventoId},
                    { $set: { "agenda.$": eventoAlterado } }, 
                    { new: true }
                );

        if(eventoEditado){
            return NextResponse.json({updated: 200},{status: 200})
        } else {
            return NextResponse.json({updated: 'Nenhum evento encontrado para fazer a atualização'}, {status: 500})
        }




    }catch(error){
        console.log(error)
        return NextResponse.json({error},{status: 500})
    }

}