import Link from "next/link";
import { SignInButtons } from "./sign-in-buttons";
import { getServerUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const user = await getServerUser();

  if (user) {
    return redirect("/");
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <main className="rounded-md space-y-8 border shadow-md max-w-md px-10 py-16 text-black bg-white">
        <div className="text-center">
          <Link className="font-display text-3xl" href="/">
            ΠΚΚ
          </Link>
          <h1 className="text-center text-2xl font-bold">
            Logg inn på Pi Kappa Kappa
          </h1>
        </div>

        <SignInButtons />

        <div>
          <p className="text-center">
            <Link
              className="text-blue-600 font-medium hover:underline"
              href="/"
            >
              Til hovedsiden
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
