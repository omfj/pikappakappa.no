import Link from "next/link";
import { Header, HeaderLogo, Navigation } from "./ui/header";
import { getServerUser } from "@/lib/auth/session";

export async function SiteHeader() {
  const user = await getServerUser();

  return (
    <Header>
      <HeaderLogo>
        <Link href="/">ΠΚΚ</Link>
      </HeaderLogo>
      <Navigation
        routes={[
          { href: "/", label: "Hjem" },
          { href: "/vedtekter", label: "Vedtekter" },
          { href: "/besok", label: "Besøk" },
          { href: "/om-oss", label: "Om oss" },
        ]}
      />
    </Header>
  );
}
