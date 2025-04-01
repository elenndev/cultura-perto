'use client'
import { useState } from "react";
import axios from "axios";
import { InputSpan } from "@/styles/Styles";


const url = process.env.NEXT_PUBLIC_APP_URL

interface criarContaProps {
    irParaOsDetalhes: (usuario: {username: string, email: string, password: string}) => void;
}
export default function CriarConta(props : criarContaProps) {
    const [email, setEmail] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const [username, setUsername] = useState("")

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setError(""); 

        try{
            const reqChecarUsernameEmail = await axios.get(`${url}/api/user`, { params: { email, username } });

            if(reqChecarUsernameEmail.data.user && ['email indisponivel','username indisponivel','email e nome de usuario indisponivel'].includes(reqChecarUsernameEmail.data.user)){
                setLoading(false)
                return setError(reqChecarUsernameEmail.data.user as string)
            }
        }catch(error){
            console.log(error)
            setLoading(false)
            return setError("Erro na requisição para criar o usuário, se o erro persistir por favor entre em contato com o suporte")
        }

        if(password != confirmarSenha){
        return setError("Senhas diferentes, por favor verifique novamente")
        }
        props.irParaOsDetalhes({
            email,
            username,
            password,
        })


        };

        return(
            <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-sm p-6 bg-white border border-[#ffb162] rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Criar uma nova conta</h1>
            
            <form onSubmit={handleSubmit}>
                <InputSpan className="mb-4 flex-col">
                    <label htmlFor="username" className="block text-sm font-semibold">
                        Nome de usuario
                    </label>
                    <input
                        type="username"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3"
                        required/>
                </InputSpan>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email
                    </label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                    />
                </div>
            
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Senha
                </label>
                <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="confirmarSenha" className="block text-sm font-semibold text-gray-700">
                Confirmar senha
                </label>
                <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
                />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="mb-4">
                <button
                disabled={loading}
                type="submit"
                className={`w-full py-3 px-4 bg-blue-500  text-white ${loading ? 'opacity-50 bg-blue-800' : 'hover:bg-blue-600'} font-semibold rounded-md `}
                >Criar Conta</button>
            </div>
            </form>

            <div className="text-center mt-4">
            <a href="/login"
            className="text-blue-500 font-semibold">Já tem uma conta? Faça login</a>
            </div>
        </div>
        </div>
    )
}
