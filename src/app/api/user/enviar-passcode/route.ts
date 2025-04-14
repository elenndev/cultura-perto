import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { connectMongoDB } from "../../../../../lib/db";
import ValidacaoPendenteDB from "../../../../../models/validacaoPasscode";
import nodemailer from "nodemailer";
import UserDB from "../../../../../models/userModel";

function gerarCodepass(){
    const allowChar = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no I, L, O, 0, 1
    const codeLength = 6;
    let code = '';

    while (code.length < codeLength) {
        const byte: number = crypto.randomBytes(1)[0];
        const index: number = byte % allowChar.length;
        const char: string = allowChar.charAt(index);
        code += char;
    }

    return code;
}

export async function POST(request: NextRequest){
    
    try {
        await connectMongoDB()
        const { email} = await request.json()
        if (!email){
            throw new Error("Parâmetros ausentes")
        }

        const checarExistenciaUsuario = await UserDB.findOne({email})
        if(!checarExistenciaUsuario){
            return NextResponse.json({usuarioInexistente: true},{status: 200})
        }
        const code = gerarCodepass()
        const expiration = new Date(Date.now() + 60 * 60 * 1000);
        const validacaoPendente = await ValidacaoPendenteDB.findOne({email})

        let response
        if(validacaoPendente){
            const createdAt = new Date()
            const atualizarValidacao = await ValidacaoPendenteDB.findOneAndUpdate({email}, {$set: {code, expiration, createdAt}},{new:true})

            if(atualizarValidacao){
                response = {message: "código de validacao atualizado", codeGeneration: 200}
            } else{throw new Error("Erro ao tentar atualizar a validação pendente")}
        } else {
            const novaValidacaoPendente = await ValidacaoPendenteDB.create({
                email,
                code,
                expiration
            })
            if(novaValidacaoPendente){
                response = {message: "código de validacao criado", codeGeneration: 200}
            } else { 
                throw new Error("Erro ao tentar atualizar a validação pendente")
            }
        }

        await enviarEmail().catch((error)=>{
            console.log(error)
            throw new Error("Erro ao envar enviar o email")
        })
        return NextResponse.json(response,{status: 200})

        async function enviarEmail(){
            const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });
                
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Cultura Perto - Código de verificação',
                    html: `<p>Este é o seu código de verificação: <strong>${code}</strong><p>`,
                };

                const emailEnviado = await transporter.sendMail(mailOptions);
                if(!emailEnviado.accepted || emailEnviado.accepted.length == 0){
                    throw new Error()
                }
        }


    }catch(error){
        console.log(error)
        return NextResponse.json({error},{status: 500})
    }

}