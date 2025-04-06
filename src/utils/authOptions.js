import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import axios from "axios";

const url = process.env.APP_URL;

async function verificarSenha(plainPassword, hash) {
  return bcrypt.compare(plainPassword, hash);
}

async function buscarUserDb(credential) {
  try {
    const req = await axios.get(`${url}/api/user`, { params: { credential } });
    if (req.data.user) {
      return {
        _id: req.data.user._id,
        email: req.data.user.email,
        username: req.data.user.username,
        password: req.data.user.password,
        isverified: req.data.isverified,
      };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        credential: {
          label: "Credential",
          type: "text",
          placeholder: "Email ou nome de usuário",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await buscarUserDb(credentials.credential);
        if (!user) throw new Error("Usuário não encontrado");

        const validarSenha = await verificarSenha(
          credentials.password,
          user.password
        );
        if (!validarSenha) throw new Error("Credenciais erradas");

        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.username = token.username;
      session.user.isverified = token.isverified;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.picture = null;
        token.sub = user._id;
        token.isverified = user.isverified;
      }
      return token;
    },
  },
};
