import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/client";
import { redirect } from "next/navigation";

export default async function AdminHome() {
  const session = await getSession();

  if (!session) {
    return redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.id,
    },
  });

  if (user?.type !== "ADMIN") {
    return redirect("/api/auth/signin");
  }

  const visits = await prisma.visit.findMany();

  return (
    <main className="container max-w-2xl w-full my-10">
      <h1 className="text-3xl font-bold">Admin</h1>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Visits</h2>
        <ul className="mt-2">
          {visits.map((visit) => {
            return (
              <li key={visit.id} className="mt-2">
                <p className="text-gray-500">{visit.name}</p>
                <p className="text-gray-500">
                  {visit.reason.split("\n").map((p, i) => (
                    <span key={i}>{p}</span>
                  ))}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
