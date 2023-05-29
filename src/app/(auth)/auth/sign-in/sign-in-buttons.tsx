"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function SignInButtons() {
  return (
    <div className="flex flex-col gap-3">
      <Button onClick={() => signIn("discord")}>Logg inn med Discord</Button>
    </div>
  );
}
