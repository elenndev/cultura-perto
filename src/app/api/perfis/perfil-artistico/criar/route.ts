import { NextRequest, NextResponse } from "next/server";
import { TypePerfilArtistico } from "@/types";
import { connectMongoDB } from "../../../../../../lib/db";
import PerfilArtisticoDB from "../../../../../../models/profileModel";
import UserDB from "../../../../../../models/userModel";

export async function POST(request: NextRequest){
    try {
        const {userId, perfil} = await request.json()
        if(!userId || !perfil){
            throw new Error('Erro ao obter os parâmetros da requisição')
        }
        await connectMongoDB()
        const infosPerfil = perfil as TypePerfilArtistico
        const newPerfil = await PerfilArtisticoDB.create({
            nome: infosPerfil.nome,
            descricao: infosPerfil.descricao,
            tipo: infosPerfil.tipo,
            area: infosPerfil.area,
            linksDoPerfil: infosPerfil.linksDoPerfil,
            localidade: infosPerfil.localidade
        })

        if(!newPerfil){
            throw new Error('Erro ao tentar criar perfil artístico no db')
        }

        const atualizarUsuario = await UserDB.updateOne({_id: userId},{$set: {perfilArtisticoId: newPerfil._id}})

        if(atualizarUsuario.modifiedCount != 1){
            throw new Error('Erro ao tentar atualizar o usuário para ter o id do perfil artistico')
        } else {
            return NextResponse.json({perfilArtisticoId: newPerfil._id},{status: 200})
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({error},{status: 500})
    }

}