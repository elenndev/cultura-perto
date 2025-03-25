import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/db";
import PerfilArtisticoDB from "../../../../../models/profileModel";

export async function POST(request: NextRequest){
    try {
        const {perfil, username} = await request.json()
        if(!perfil || !username){
            throw new Error('Parâmetros necessários não encontrados na requisição')
        }

        await connectMongoDB()

        const eventoEditado = await PerfilArtisticoDB.findOneAndUpdate(
            { username },
            { $set: perfil },
            { new: true }
        )

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