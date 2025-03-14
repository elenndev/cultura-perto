import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import axios from "axios";

const url = process.env.APP_URL

async function hashPassword(plainPassword){
  const saltRounds = 10; // Número de rounds de salt
  return bcrypt.hash(plainPassword, saltRounds); // Retorna o hash da senha
}

async function registrarNovoUser(email, password){
  const passwordHash = await hashPassword(password);

  try{
    const req = await axios.post(`${url}/api/user/new`,{
      email, password: passwordHash })

    if(req){
      const newUser = {
        email,
        password,
        _id: req.data.id
      }

      return newUser
    } else {
      throw new Error('Erro na requisição')
    }
  }catch(error){console.log(error); return null}

}


async function verificarSenha(plainPassword, hash){
    return bcrypt.compare(plainPassword, hash);
}

async function buscarUserDb(email){

  try{
      const req = await axios.get(`${url}/api/user`,{params:{email}})
      if(req.data){
        let user = {_id: req.data.user._id, email: req.data.user.email, password: req.data.user.password}
        if(req.data.user.perfilArtisticoId){
          user = {...user, perfilArtisticoId: req.data.user.perfilArtisticoId}
        }
        return user
      } else {
        throw new Error('Erro na requisição')
      }
    }catch(error){console.log(error); return null}

}

const handler = NextAuth({
providers: [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: "Email", type: "text", placeholder: "@mail.com" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      let user = await buscarUserDb(credentials.email)
      if(credentials.action === 'signin'){
        if(user != null | undefined){
          throw new Error('Já existe um usuário')
        } else {
          user = registrarNovoUser(credentials.email, credentials.password)
          return user
        }
      } else {
        if(user == null | undefined){
          throw new Error('Usuário não encontrado')
        } else {
          const validarSenha = await verificarSenha(credentials.password, user.password)
            if(validarSenha == true){
                let sessionUser = {email: user.email, _id:user._id,}
                if(user.perfilArtisticoId){
                  sessionUser = {...sessionUser, perfilArtisticoId: user.perfilArtisticoId}
                }
                return sessionUser  
            }else { throw new Error('Credenciais erradas')}
        }
      }
      
    }
  })
]

})

export { handler as GET, handler as POST }