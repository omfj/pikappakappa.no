import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  const logo = "/pikk-dark-trans.png";

  return (
    <>
      <Head>
        <title>ΠΚΚ - Hovedside</title>
        <meta name="description" content="Nettsiden til Pi Kappa Kappa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mx-auto w-fit">
          <h1 className="sr-only">ΠΚΚ</h1>
          <Image
            src={logo}
            height={700}
            width={700}
            alt="Pi Kappa Kappa logo"
          />
          <p className="text-center text-white">Coming soon</p>
        </div>
      </main>
    </>
  );
};

export default Home;
