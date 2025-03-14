'use client'
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
 
export function Login(){
    // const router = useRouter();
    const { data: session, status } = useSession();

  
  // Estado para controlar os valores do formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false); // Para alternar entre login e criar conta
  const [error, setError] = useState("");

  // Função de handleSubmit para login ou criação de conta
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError(""); // Reseta erros

    // Faz a autenticação ou cria o novo usuário
    const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
    });

    if (response?.error) {
      setError("Credenciais inválidas ou algo deu errado. Tente novamente.");
    } else {
      // Caso a autenticação tenha sucesso, redireciona
      console.log('??')

    if (status === "loading") return <p>Carregando...</p>;

    if (!session) return <p>Você precisa estar logado.</p>;
        const userProfile = session.user
        console.log('user retornado pelo useSession', userProfile)
        // router.push(`/perfil/${userProfile.`); // Redirecionar para a página desejada após login
        }
    };

  // Função para alternar entre login e criar nova conta
  const toggleCreateAccount = () => {
    setIsCreatingAccount((prev) => !prev);
    setError(""); // Reseta os erros ao alternar entre os modos
  };
    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isCreatingAccount ? "Criar uma nova conta" : "Login"}
        </h1>
        
        <form onSubmit={handleSubmit}>
          {/* Campo de Email */}
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

          {/* Campo de Senha */}
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

          {/* Mensagem de erro */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              {isCreatingAccount ? "Criar Conta" : "Entrar"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={toggleCreateAccount}
            className="text-blue-500 font-semibold"
          >
            {isCreatingAccount ? "Já tem uma conta? Faça login" : "Criar uma nova conta"}
          </button>
        </div>
      </div>
    </div>
    )
}