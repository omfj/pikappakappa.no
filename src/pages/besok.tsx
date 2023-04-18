import Container from "@/components/ui/container";
import FormControl from "@/components/ui/form-control";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { Heading, Small } from "@/components/ui/typography";
import { Textarea } from "@/components/ui/textarea";
import DefaultLayout from "@/layouts/default";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { people } from "@/lib/visit";

const visitorFormSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  person: z.enum(["all", "oj", "id", "ge"]),
  reason: z.string().min(1).max(1000),
});
type VisitorForm = z.infer<typeof visitorFormSchema>;

const VisitorPage = () => {
  const { toast } = useToast();

  const visits = api.visitor.getAll.useQuery();

  const visitMutation = api.visitor.visit.useMutation({
    onSuccess: () => {
      methods.reset();
      toast({
        title: "Besøk meldt",
        description: "Vi har mottatt besøket ditt.",
      });
      void visits.refetch();
    },
    onError: () => {
      toast({
        title: "Feil",
        description: "Noe gikk galt. Prøv igjen senere.",
      });
    },
  });

  const methods = useForm<VisitorForm>({
    resolver: zodResolver(visitorFormSchema),
  });

  const onSubmit = methods.handleSubmit(
    (data) => visitMutation.mutate(data),
    (errors) => console.log("Errors", errors)
  );

  return (
    <DefaultLayout title="Besøk" description="Besøk Pi Kappa Kappa">
      <Container>
        <Heading className="text-center text-3xl font-bold">
          Meld om besøk
        </Heading>
        <Small className="text-center">
          Her kan du melde om besøk til Pi Kappa Kappa. Husk å fylle ut alle
          feltene.
        </Small>

        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={onSubmit} className="my-5 flex flex-col gap-4">
          <FormControl>
            <Label htmlFor="name">Navn</Label>

            <Input
              {...methods.register("name")}
              type="text"
              id="name"
              name="name"
            />

            <div>
              <Small>Hva heter du?</Small>
            </div>
          </FormControl>

          <FormControl>
            <Label htmlFor="email">E-post</Label>

            <Input
              {...methods.register("email")}
              type="email"
              id="email"
              name="email"
            />

            <div>
              <Small>Hva er e-posten din?</Small>
            </div>
          </FormControl>

          <FormControl>
            <Label htmlFor="person">Person</Label>

            <Controller
              name="person"
              control={methods.control}
              render={({ field }) => (
                <RadioGroup value={field.value} onValueChange={field.onChange}>
                  {Object.entries(people).map(([id, name]) => (
                    <div key={id} className="flex items-center space-x-2">
                      <RadioGroupItem value={id} id={id} />
                      <Label htmlFor={id}>{name}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />

            <div>
              <Small>Hvem skal du besøke?</Small>
            </div>
          </FormControl>

          <FormControl>
            <Label htmlFor="reason">Grunn</Label>

            <Textarea
              {...methods.register("reason")}
              id="reason"
              name="reason"
              rows={4}
            />

            <div>
              <Small>Hvorfor skal du på besøk til Pi Kappa Kappa?</Small>
            </div>
          </FormControl>

          <div className="flex gap-2">
            <Button type="submit">Send inn</Button>
          </div>
        </form>
      </Container>
    </DefaultLayout>
  );
};

export default VisitorPage;
