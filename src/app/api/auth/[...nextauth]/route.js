import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import axios from "axios";

const url = process.env.APP_URL;

async function hashPassword(plainPassword) {
  const saltRounds = 10;
  return bcrypt.hash(plainPassword, saltRounds);
}

async function registrarNovoUser(email, password) {
  const passwordHash = await hashPassword(password);
  try {
    const req = await axios.post(`${url}/api/user/new`, {
      email,
      password: passwordHash,
    });

    if (req) {
      return {
        email,
        password,
        _id: req.data.id,
      };
    } else {
      throw new Error("Erro na requisição");
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function verificarSenha(plainPassword, hash) {
  return bcrypt.compare(plainPassword, hash);
}

async function buscarUserDb(email) {
  try {
    const req = await axios.get(`${url}/api/user`, { params: { email } });
    if (req.data.user) {
      let user = {
        _id: req.data.user._id,
        email: req.data.user.email,
        password: req.data.user.password,
      };
      if (req.data.user.perfilArtisticoId) {
        user = { ...user, perfilArtisticoId: req.data.user.perfilArtisticoId };
      }
      return user;
    } else {
      return null
    }
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
        email: { label: "Email", type: "text", placeholder: "@mail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        let user = await buscarUserDb(credentials.email);

        if (credentials.action === "signin") {
          if (user != null || undefined) {
            throw new Error("Já existe um usuário");
          } else {
            user = await registrarNovoUser(credentials.email, credentials.password);
            return user;
          }
        } else {
          if (user == null || undefined) {
            throw new Error("Usuário não encontrado");
          } else {
            const validarSenha = await verificarSenha(credentials.password, user.password);
            if (validarSenha == true) {
              let sessionUser = { email: user.email, _id: user._id };
              if (user.perfilArtisticoId) {
                sessionUser = { ...sessionUser, perfilArtisticoId: user.perfilArtisticoId };
              }
              return sessionUser;
            } else {
              throw new Error("Credenciais erradas");
            }
          }
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = user.email;
        token.email = user.email;
        token.picture = null;
        token.sub = user._id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
