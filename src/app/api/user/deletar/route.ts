import { NextRequest, NextResponse } from "next/server";
import UserDB from "../../../../../models/userModel";
import { connectMongoDB } from "../../../../../lib/db";
import PerfilArtisticoDB from "../../../../../models/profileModel";

export async function POST(request: NextRequest){
    try {
        await connectMongoDB()
        const { username } = await request.json()
        
        if(!username){
            throw new Error('Parâmetros necessários não encontrados na requisição')
        }
        
        const deletarUser = await UserDB.findOneAndDelete({username})
        const deletarPerfil = await PerfilArtisticoDB.findOneAndDelete({username})

        if(deletarUser && deletarPerfil){
            return NextResponse.json({deletado: 200})
        } else {
            throw new Error("Problema em encontrar e deletar o user e o perfil")
        }


    }catch(error){
        console.log(error)
        return NextResponse.json({error},{status: 500})
    }

}