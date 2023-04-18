import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Heading } from "@/components/ui/typography";
import DefaultLayout from "@/layouts/default";
import { getServerAuthSession } from "@/server/auth";
import { type GetServerSideProps, type NextPage } from "next";
import { getProviders, signIn } from "next-auth/react";

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

const SignInPage: NextPage<Props> = ({ providers }) => {
  return (
    <DefaultLayout title="Logg inn | Pi Kappa Kappa">
      <Container>
        <Heading className="mb-5 text-center">
          Velg en måte å logge inn på
        </Heading>
        <div className="mx-auto flex w-fit flex-col gap-4">
          {Object.values(providers ?? {}).map((provider) => (
            <div key={provider.name}>
              <Button onClick={() => void signIn(provider.id)}>
                Logg inn med {provider.name}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default SignInPage;
