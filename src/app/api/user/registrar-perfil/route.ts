import { NextRequest, NextResponse } from "next/server";
import UserDB from "../../../../../models/userModel";

export async function POST(request: NextRequest){
    try {
        const {userId, perfil} = await request.json()

        
        if(!userId || !perfil){
            throw new Error('Email não identificado no parâmetro')
        }
        // const user = UserDB.findOne({email: email})

        if(!user){
            throw new Error('Usuário não encontrado')
        } else {
            return NextResponse.json({user},{status: 200})
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({error},{status: 500})
    }

}