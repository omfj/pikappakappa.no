"use client";

import Image from "next/image";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { userSchema } from "@/lib/validators/user";
import { useState } from "react";

export function PersonalProfile({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name ?? "",
      bio: user?.biography ?? "",
    },
  });

  const onSubmit = methods.handleSubmit(async (values) => {
    try {
      setIsLoading(true);
      await axios.post("/api/user/" + user.id, values);
      setIsLoading(false);

      alert("Profilen din er oppdatert!");
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <main>
      <h1 className="text-4xl font-bold text-center my-4">Min profil</h1>

      <Form {...methods}>
        <form
          onSubmit={onSubmit}
          className="container max-w-2xl w-full my-10 space-y-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {user?.image && (
              <Image
                src={user?.image}
                alt="Profile picture"
                width={150}
                height={150}
                className="rounded-lg"
              />
            )}
            <div className="flex flex-col">
              <FormField
                name="name"
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className="text-2xl font-bold" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <p className="text-xl">{user?.email}</p>
            </div>
          </div>
          <div>
            <FormField
              name="bio"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Biografi</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Din biografi" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button disabled={isLoading}>
              {isLoading ? "Oppdaterer..." : "Oppdater profil"}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
