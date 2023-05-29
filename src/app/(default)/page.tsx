import { prisma } from "@/lib/db/client";

export default async function Home() {
  const members = await prisma.member.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="container max-w-2xl w-full my-10">
      <h1 className="font-display text-6xl mb-10">Pi Kappa Kappa</h1>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Medlemmer:</h2>
        <ul>
          {members.map((member) => (
            <li key={member.id}>{member.name}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
