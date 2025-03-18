import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { obterPerfilArtistaId} from './obterPerfilArtistaId'

export async function getSessionData() {
  const session = await getServerSession(authOptions);
  const checkId = await obterPerfilArtistaId(session.user.email)
  if(checkId){
    const updatedUser = {...session.user, perfilArtisticoId}
    session.user = updatedUser
  } else {
    console.log('no auth identifciado como null')
  }
  console.log("Session obtida no servidor e que vai ser retornado:", session);
  return session;
}
