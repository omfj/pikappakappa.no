import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Heading } from "@/components/ui/typography";
import { useToast } from "@/hooks/use-toast";
import DefaultLayout from "@/layouts/default";
import { people } from "@/lib/visit";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/utils/api";
import { format } from "date-fns";
import { type GetServerSideProps } from "next";

const AdminPage = () => {
  const { toast } = useToast();

  const visits = api.visitor.getAll.useQuery();

  const deleteVisitMutation = api.visitor.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Besøk slettet",
      });
      void visits.refetch();
    },
    onError: () => {
      toast({
        title: "Feil",
        description: "Noe gikk galt. Prøv igjen senere.",
      });
    },
  });

  return (
    <DefaultLayout title="Admin | Pi Kappa Kappa">
      <Container>
        <Heading>Admin</Heading>
        <p className="text-lg">Administrer siden her</p>

        <hr className="my-4" />

        <div>
          <Heading level={2}>Nyligste besøk</Heading>

          {visits.data?.length === 0 && (
            <p className="text-lg">Ingen besøk registrert</p>
          )}

          <ul className="flex flex-col gap-4">
            {visits.data?.map((visit) => (
              <li key={visit.id}>
                <div className="flex flex-col gap-2 rounded-lg border p-4">
                  <Heading level={4}>Besøk fra {visit.visitor.name}</Heading>

                  <div>
                    <p>
                      <span className="font-semibold">Dato:</span>{" "}
                      {format(new Date(visit.date), "dd.MM.yyyy HH:mm")}
                    </p>

                    <p>
                      <span className="font-semibold">Besøkte:</span>{" "}
                      {people[visit.visiting as keyof typeof people]}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold">Hvorfor:</p>
                    <p>{visit.reason}</p>
                  </div>

                  <div>
                    <Button
                      onClick={() =>
                        deleteVisitMutation.mutate({ id: visit.id })
                      }
                      variant="destructive"
                      size="sm"
                    >
                      Slett
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session?.user.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default AdminPage;
