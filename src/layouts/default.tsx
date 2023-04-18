import Header from "@/components/header";
import Head from "next/head";

type DefaultLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const DefaultLayout = ({
  title,
  description,
  children,
}: DefaultLayoutProps) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <main className="mb-20">{children}</main>
    </div>
  );
};

export default DefaultLayout;
