import { components } from "@/components/mdx";
import AboutContent from "./om-oss.mdx";

export const metadata = {
  title: "Om oss",
};

export default function About() {
  return (
    <main className="container max-w-2xl w-full my-10">
      <AboutContent components={components} />
    </main>
  );
}
