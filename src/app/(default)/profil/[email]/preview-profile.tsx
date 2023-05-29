import Image from "next/image";
import { User } from "@prisma/client";

export function PreviewProfile({ user }: { user: User }) {
  return (
    <main className="container max-w-2xl w-full my-10 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        {user?.image && (
          <Image
            src={user?.image}
            alt="Profile picture"
            width={150}
            height={150}
            className="rounded-lg"
          />
        )}
        <div className="flex flex-col">
          <p className="text-2xl font-bold">{user?.name}</p>
          <p className="text-xl">{user?.email}</p>
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold">Biografi</p>
        <p>{user.biography}</p>
      </div>
    </main>
  );
}
