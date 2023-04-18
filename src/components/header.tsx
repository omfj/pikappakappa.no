import Link from "next/link";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

const ROUTES = [
  {
    label: "Hjem",
    to: "/",
  },
  {
    label: "Vedtekter",
    to: "/vedtekter",
  },
  {
    label: "Besøk",
    to: "/besok",
  },
];

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="mb-10">
      <header className="flex flex-col p-5">
        <div className="flex items-center pb-2">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Pi Kappa Kappa</h2>
          </div>

          {session ? (
            <Button onClick={() => void signOut()} size="sm">
              Logg ut
            </Button>
          ) : (
            <Button onClick={() => void signIn()} size="sm">
              Logg inn
            </Button>
          )}
        </div>

        <nav className="sticky top-0">
          <ul className="flex items-center gap-3">
            {ROUTES.map((route, index) => (
              <li key={index}>
                <Link
                  className="text-sm font-medium leading-none hover:underline"
                  href={route.to}
                >
                  {route.label}
                </Link>
              </li>
            ))}

            {session?.user.role === "ADMIN" && (
              <li>
                <Link
                  className="text-sm font-medium leading-none hover:underline"
                  href="/admin"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <hr />
    </div>
  );
};

export default Header;
