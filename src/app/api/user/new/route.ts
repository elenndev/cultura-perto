import { NextRequest, NextResponse } from "next/server";
import UserDB from "../../../../../models/userModel";
import { connectMongoDB } from "../../../../../lib/db";

export async function POST(request: NextRequest){
    console.log('req api db')
    try {
        await connectMongoDB()
        const {email, username, password} = await request.json()
        
        if(!email || !password || !username){
            throw new Error('Email não identificado no parâmetro')
        }

        const checkUsername = await UserDB.findOne({username: username})
        if (checkUsername){
            const response = NextResponse.json({user: 'username indisponivel'}, {status: 200})
            return response
        }
        const newUser = await UserDB.create({email, password, username, isverified: false})

        if(!newUser){
            throw new Error('Erro ao tentar criar usuário no dn')
        } else {
            return NextResponse.json({id: newUser._id},{status: 200})
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({error},{status: 500})
    }

}