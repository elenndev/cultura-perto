'use client'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const [emailOuUsername, setEmailOuUsername] = useState("")
    const router = useRouter()
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setError(""); 

        const response = await signIn("credentials", {
            redirect: false,
            callbackUrl: '/',
            password,
            credential: emailOuUsername });

        if (response?.error || response?.status != 200) {
        console.log('erro idenfiticado: ',response?.error)
        setError(response?.error ?? "Erro ");
        setLoading(false)
        }else {
            router.push('/')
        }
        };

        function irParaCriarConta(){
            router.push('/criar-conta')
        }

        return(
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
            
            <form onSubmit={handleSubmit}>

            <div className="mb-4">
                <label htmlFor="crendential" className="block text-sm font-semibold text-gray-700">
                Email ou nome de usuário
                </label>
                <input
                type="text"
                id="crendential"
                name="crendential"
                value={emailOuUsername}
                onChange={(e) => setEmailOuUsername(e.target.value)}
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

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="mb-4">
                <button
                disabled={loading}
                type="submit"
                className={`w-full py-3 px-4 bg-blue-500  text-white ${loading ? 'opacity-50 bg-blue-800' : 'hover:bg-blue-600'} font-semibold rounded-md `}
                >Entrar</button>
            </div>
            </form>

            <div className="text-center mt-4">
            <button type="button" onClick={()=> irParaCriarConta()}  className="text-blue-500 font-semibold"
            >Criar uma nova conta</button>
            </div>
        </div>
        </div>
        )
}
