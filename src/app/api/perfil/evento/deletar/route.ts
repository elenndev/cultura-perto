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

        const { eventoId, username } = evento
        const perfil = await PerfilArtisticoDB.findOne({username: username})
        const _id = perfil._id

        if(!perfil){
            throw new Error()
        }


        const atualizarAgenda = await PerfilArtisticoDB.findByIdAndUpdate(
                    {_id},
                    { $pull: { agenda: {_id: eventoId} } }, 
                    { new: true }
                );

        if(atualizarAgenda){
            return NextResponse.json({agenda: atualizarAgenda},{status: 200})
        } else {
            return NextResponse.json({agenda: 'Nenhum evento encontrado para fazer a atualização'}, {status: 500})
        }




    }catch(error){
        console.log(error)
        return NextResponse.json({error},{status: 500})
    }

}