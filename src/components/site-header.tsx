import Link from "next/link";
import { Header, HeaderLogo, Navigation, Route } from "./ui/header";
import { getSession } from "@/lib/auth/session";

export async function SiteHeader() {
  const user = await getSession();

  const commonRoutes: Array<Route> = [
    {
      href: "/",
      label: "Hjem",
    },
    {
      href: "/vedtekter",
      label: "Vedtekter",
    },
    {
      href: "/besok",
      label: "Besøk",
    },
    {
      href: "/om-oss",
      label: "Om oss",
    },
  ];

  const authedRoutes: Array<Route> = [
    {
      href: `/profil/${encodeURIComponent(user?.email ?? "")}`,
      label: "Profil",
    },
    {
      href: "/api/auth/signout",
      label: "Logg ut",
    },
  ];

  const unauthedRoutes: Array<Route> = [
    {
      href: "/auth/sign-in",
      label: "Logg inn",
    },
  ];

  return (
    <Header>
      <HeaderLogo>
        <Link href="/">ΠΚΚ</Link>
      </HeaderLogo>
      <Navigation
        routes={commonRoutes.concat(user ? authedRoutes : unauthedRoutes)}
      />
    </Header>
  );
}
