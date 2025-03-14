import { NextRequest, NextResponse } from "next/server"

export async function GET(request:  NextRequest){
    const { searchParams } = new URL(request.url)
    try{
        const _id = searchParams.get('_id')
        const cidade = searchParams.get('_id')
        if(!_id && !cidade){
            throw new Error('Erro ao tentar acessar os parametros da requisição')
        }

        if(_id){

        } else {
            
        }

    }catch(error){}
}