import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest){
    const {mensagem} = await request.json()

    if(!mensagem){
        return NextResponse.json({erro: 'Parâmetros ausentes'},{status: 500})
    }
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Mensagem do Webiste - Sugestão/Reportando erro',
        text: mensagem,
    };
    
    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({mensagem: 200},{status: 200} )
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        return NextResponse.json({erro: 'Erro ao tentar enviar o email'}, {status: 500})
    }
}