import { Heading } from "@/components/typography";
import { VisitForm } from "./visit-form";
import { prisma } from "@/lib/db/client";

export const metadata = {
  title: "Besøk",
};

export default async function Visit() {
  const members = (
    await prisma.member.findMany({
      select: {
        id: true,
        name: true,
      },
    })
  ).map((member) => ({
    id: member.id,
    label: member.name,
  }));

  return (
    <main className="container max-w-2xl w-full my-10">
      <Heading level={1}>Besøk</Heading>

      <VisitForm members={members} />
    </main>
  );
}
