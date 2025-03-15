import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Ajuste conforme necessário

export async function getSessionData() {
  const session = await getServerSession(authOptions);
  console.log("Session obtida no servidor:", session);
  return session;
}
