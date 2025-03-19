import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/db";
import PerfilArtisticoDB from "../../../../models/profileModel";

export async function GET(request: NextRequest){
    try {
        const { searchParams } = new URL(request.url)
        const username = searchParams.get('username')
        await connectMongoDB()

        if(!username){
            throw new Error('Parâmetros necessários não foram encontrados')
        }

        const perfil = await PerfilArtisticoDB.findOne({username: username})
        return NextResponse.json({perfil},{status: 200})

    }catch(error){
        console.log(error)
        return NextResponse.json({error},{status: 500})
    }

}