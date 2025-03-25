import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/db";
import PerfilArtisticoDB from "../../../../../models/profileModel";

export async function GET(request: NextRequest){
    try {
        const { searchParams } = new URL(request.url)
        const cidade = searchParams.get('cidade')
        const estado = searchParams.get('estado')
        const nome = searchParams.get('nome')
        const obterAreaArtistica = searchParams.getAll('arte[]')

        await connectMongoDB()

        if(!cidade && !estado && !nome && !obterAreaArtistica){
            throw new Error('Parâmetros necessários não foram encontrados')
        } else if((cidade && !estado) || (!cidade && estado)){
            throw new Error('Parâmetros necessários não foram encontrados')
        }

        if(cidade && estado){
            const perfis = await PerfilArtisticoDB.find({
                "localidade.cidade": cidade,
                "localidade.estado": estado,
                area: { $in: obterAreaArtistica.includes("todas") ? ["musica", "cenica", "artesanato"] : obterAreaArtistica }
            });
            
            return NextResponse.json({perfis},{status: 200})
        } else {
            const perfis = await PerfilArtisticoDB.find({nome})
            return NextResponse.json({perfis},{status: 200})
        }

    }catch(error){
        console.log(error)
        return NextResponse.json({error},{status: 500})
    }

}