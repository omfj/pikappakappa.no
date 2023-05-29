import BylawsContent from "./bylaws.mdx";
import { components } from "@/components/mdx";

export const metadata = {
  title: "Vedtekter",
};

export default function Bylaws() {
  return (
    <main className="container my-10">
      <BylawsContent components={components} />
    </main>
  );
}
