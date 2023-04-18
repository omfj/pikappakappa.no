import Container from "@/components/ui/container";
import { Heading } from "@/components/ui/typography";
import DefaultLayout from "@/layouts/default";
import { people } from "@/lib/visit";
import { type NextPage } from "next";

const Home: NextPage = () => {
  const peopleNotAll = Object.values(people).filter(
    (person) => person !== "Alle"
  );

  return (
    <DefaultLayout
      title="Pi Kappa Kappa"
      description="Nettsiden til Pi Kappa Kappa."
    >
      <Container>
        <Heading>Pi Kappa Kappa</Heading>
        <p className="text-lg">
          Velkommen til nettsiden til Pi Kappa Kappa, Norges råeste kollektiv.
        </p>

        <hr className="my-8" />

        <Heading level={2}>Medlemmer</Heading>

        <div>
          {Object.values(peopleNotAll).map((person) => (
            <div key={person}>
              <p className="text-3xl font-semibold">{person}</p>
            </div>
          ))}
        </div>
      </Container>
    </DefaultLayout>
  );
};

export default Home;
