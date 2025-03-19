import { NextRequest, NextResponse } from "next/server";
import UserDB from "../../../../models/userModel";
import { connectMongoDB } from "../../../../lib/db";

export async function GET(request: NextRequest){
    try {
        const { searchParams } = new URL(request.url)
        const email = searchParams.get('email')
        const username = searchParams.get('username')
        const credential = searchParams.get('credential')
        await connectMongoDB()

        if(!email && !username && !credential){
            throw new Error('Parâmetros necessários não foram encontrados')
        }

        if(email && username){
            // quando for criar uma nova conta, antes sera verificado se já existe um registro com o email e username solicitado
            const userByUsername = await UserDB.findOne({username: username})
            const userByEmail = await UserDB.findOne({email: email})
            if(userByUsername && userByEmail){
                return NextResponse.json({user: 'email e nome de usuario indisponiveis'})
            } else if(userByUsername || userByEmail){
                console.log('3')
                return NextResponse.json({user: `${userByUsername ? 'username' : 'email'} indisponivel`})
            } else {
                return NextResponse.json({user: null})
            }
        }else{
            let user = null
            if(email){
                user = await UserDB.findOne({email: email})
            } else if(username){
                user = await UserDB.findOne({username: username})
            } else if (credential){
                const getByusername = await UserDB.findOne({username: credential})
                if(getByusername){
                    user = getByusername
                } else{
                    const getByEmail = await UserDB.findOne({email: credential})
                    if(getByEmail){
                        user = getByEmail
                    }
                }
            }
            return NextResponse.json({user: user},{status: 200})
        }

    }catch(error){
        console.log(error)
        return NextResponse.json({error},{status: 500})
    }

}