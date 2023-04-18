import Container from "@/components/ui/container";
import Bylaws from "@/content/bylaws.mdx";
import DefaultLayout from "@/layouts/default";

const BylawsPage = () => {
  return (
    <DefaultLayout
      title="Vedtekter"
      description="Pi Kappa Kappa sine vedtekter"
    >
      <Container>
        <article className="prose">
          <Bylaws />
        </article>
      </Container>
    </DefaultLayout>
  );
};

export default BylawsPage;
