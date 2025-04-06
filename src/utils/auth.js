import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export async function getSessionData() {
  const session = await getServerSession(authOptions);
  return session;
}

