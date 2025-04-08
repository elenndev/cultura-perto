import { NextResponse } from "next/server";
import PerfilArtisticoDB from "../../../../../models/profileModel";
import { connectMongoDB } from "../../../../../lib/db";

export async function GET(){
    try {
        await connectMongoDB()
        const perfis = await PerfilArtisticoDB.find()
        return NextResponse.json({perfis},{status: 200})

    }catch(error){
        console.log(error)
        return NextResponse.json({error},{status: 500})
    }

}