import { getServerUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/client";
import { PreviewProfile } from "./preview-profile";
import { notFound } from "next/navigation";
import { PersonalProfile } from "./personal-profile";

type Props = {
  params: {
    email: string;
  };
};

export default async function ProfilePage({ params }: Props) {
  const { email } = params;

  const user = await getServerUser();

  const encodedEmail = encodeURIComponent(user?.email ?? "");
  const isSame = encodedEmail === email;

  const profileUser = await prisma.user.findUnique({
    where: {
      email: decodeURIComponent(email),
    },
  });

  if (!profileUser) {
    return notFound();
  }

  if (isSame && user) {
    return <PersonalProfile user={profileUser} />;
  }

  return <PreviewProfile user={profileUser} />;
}
