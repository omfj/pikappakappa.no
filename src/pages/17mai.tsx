import Container from "@/components/ui/container";
import NationalDay from "@/content/nationalday.mdx";
import DefaultLayout from "@/layouts/default";

const BylawsPage = () => {
  return (
    <DefaultLayout
      title="Vedtekter"
      description="Pi Kappa Kappa sine vedtekter"
    >
      <Container>
        <article className="prose text-center">
          <NationalDay />
        </article>
      </Container>
    </DefaultLayout>
  );
};

export default BylawsPage;
