import { getServerUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProfileMe() {
  const user = await getServerUser();

  if (!user) {
    return redirect("/auth/sign-in");
  }

  return redirect(`/profil/${user.email}`);
}
