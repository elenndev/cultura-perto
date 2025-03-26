import { NextRequest, NextResponse } from "next/server";
import UserDB from "../../../../../models/userModel";
import { connectMongoDB } from "../../../../../lib/db";
import bcrypt from "bcrypt";
import PerfilArtisticoDB from "../../../../../models/profileModel";


export async function POST(request: NextRequest){
    async function hashPassword(plainPassword: string) {
        const saltRounds = 10;
        return bcrypt.hash(plainPassword, saltRounds);
    }
    try {
        await connectMongoDB()
        const {email, username, plainPassword, perfil } = await request.json()
        
        if(!email || !plainPassword || !username || !perfil){
            throw new Error('Parâmetros necessários não encontrados na requisição')
        }

        const checkUsername = await UserDB.findOne({username: username})
        if (checkUsername){
            const response = NextResponse.json({user: 'username indisponivel'}, {status: 200})
            return response
        }

        const checkEmail = await UserDB.findOne({username: username})
        if (checkEmail){
            const response = NextResponse.json({user: 'email indisponivel'}, {status: 200})
            return response
        }

        const password = await hashPassword(plainPassword)

        const perfilArtistico = await PerfilArtisticoDB.create({
            nome: perfil.nome,
            username,
            descricao: perfil.descricao,
            tipo: perfil.tipo,
            area: perfil.area,
            linksDoPerfil: perfil.linksDoPerfil,
            localidade: perfil.localidade
        })
        if(!perfilArtistico){
            throw new Error('Erro ao tentar criar usuário no db')
        } 

        const newUser = await UserDB.create({email, password, username, isverified: false})
        if(!newUser){
            throw new Error('Erro ao tentar criar usuário no db')
        } else {
            return NextResponse.json({id: newUser._id},{status: 200})
        }

        

    }catch(error){
        console.log(error)
        return NextResponse.json({error},{status: 500})
    }

}