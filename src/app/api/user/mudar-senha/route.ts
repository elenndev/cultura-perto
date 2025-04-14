import { NextRequest, NextResponse } from "next/server"
import { connectMongoDB } from "../../../../../lib/db"
import bcrypt from "bcrypt";
import UserDB from "../../../../../models/userModel"

export async function POST(request: NextRequest){
    async function hashPassword(plainPassword: string) {
        const saltRounds = 10;
        return bcrypt.hash(plainPassword, saltRounds);
    }
    try {
        const {email, plainPassword} = await request.json()
        if(!email || !plainPassword){
            throw new Error('Parâmetros necessários não encontrados na requisição')
        }

        await connectMongoDB()
        const password = await hashPassword(plainPassword)
        const senhaAlterada = await UserDB.findOneAndUpdate(
            { email },
            { $set: {password} },
            { new: true }
        )

        if(senhaAlterada){
            return NextResponse.json({updated: 200},{status: 200})
        } else {
            return NextResponse.json({updated: 'Nenhum usuário encontrado para fazer a atualização'}, {status: 500})
        }

    }catch(error){
        console.log(error)
        return NextResponse.json({error},{status: 500})
    }

}