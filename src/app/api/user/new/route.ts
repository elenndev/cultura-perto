import { NextRequest, NextResponse } from "next/server";
import UserDB from "../../../../../models/userModel";
import { connectMongoDB } from "../../../../../lib/db";

export async function POST(request: NextRequest){
    console.log('req api db')
    try {
        await connectMongoDB()
        const {email, password} = await request.json()
        console.log('respectivamente email e password', email, password)
        
        if(!email || !password){
            throw new Error('Email não identificado no parâmetro')
        }
        const newUser = await UserDB.create({email, password})
        console.log('new user na function mongDB:', newUser)

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