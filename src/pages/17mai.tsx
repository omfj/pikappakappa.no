import Container from "@/components/ui/container";
import NationalDay from "@/content/nationalday.mdx";
import DefaultLayout from "@/layouts/default";

const BylawsPage = () => {
  return (
    <DefaultLayout
      title="17. Mai 2023"
      description="Timeplan for 17. Mai 2023"
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
