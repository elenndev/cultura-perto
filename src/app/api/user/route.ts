import { NextRequest, NextResponse } from "next/server";
import UserDB from "../../../../models/userModel";
import { connectMongoDB } from "../../../../lib/db";

export async function GET(request: NextRequest){
    try {
        const { searchParams } = new URL(request.url)
        const email = searchParams.get('email')
        await connectMongoDB()
        if(!email){
            throw new Error('Email não identificado no parâmetro')
        }
        const user = await UserDB.findOne({email: email})

        const response = NextResponse.json({user: user},{status: 200})
        return response
    }catch(error){
        console.log(error)
        return NextResponse.json({error},{status: 500})
    }

}