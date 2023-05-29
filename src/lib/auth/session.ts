import { getServerSession } from "next-auth";
import { authOptions } from "./options";

export async function getServerUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}
