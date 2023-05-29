"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { visitSchema } from "@/lib/validators/visit";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function VisitForm({
  members,
}: {
  members: Array<{ id: string; label: string }>;
}) {
  const methods = useForm<z.infer<typeof visitSchema>>({
    resolver: zodResolver(visitSchema),
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    const { status } = await axios.post("/api/visit", data);

    if (status === 201) {
      methods.reset();
      return alert("Besøk registrert");
    }

    alert("Noe gikk feil");
  });

  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Navn</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-post</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="visiting"
          render={() => (
            <FormItem>
              <FormLabel>Besøker</FormLabel>
              {members.map((member) => (
                <FormField
                  key={member.id}
                  control={methods.control}
                  name="visiting"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={member.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(member.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...(field.value ?? ""),
                                    member.id,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== member.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {member.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grunn</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Send inn</Button>
      </form>
    </Form>
  );
}
