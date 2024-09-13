"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api/client";
import type { Template } from "@aisboost/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const templateSchema = z.object({
  type: z.string(),
  apiKey: z.string(),
  apiUrl: z.string(),
});

// workaround. field "type" in prisma equals string, meanwhile server accepts literals
type TemplateType = "linkvertise" | "workink" | "lootlabs" | "shrtfly";

export function TemplateForm({
  application,
  defaultValues,
}: { application: string; defaultValues?: Template }) {
  const form = useForm<Template>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      type: defaultValues?.type ?? "linkvertise",
      apiKey: defaultValues?.apiKey ?? "",
      apiUrl: defaultValues?.apiUrl ?? "",
    },
  });

  const router = useRouter();

  async function onSubmit(data: Template) {
    if (defaultValues)
      await api.v1
        .templates({ application })({ id: defaultValues.id })
        .index.patch({
          ...data,
          type: data.type as TemplateType,
        });
    else
      await api.v1.templates({ application }).index.post({
        ...data,
        type: data.type as TemplateType,
      });

    router.push("../");
    router.refresh();
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="linkvertise">Linkvertise</SelectItem>
                        <SelectItem value="workink">Work Ink</SelectItem>
                        <SelectItem value="lootlabs">LootLabs</SelectItem>
                        <SelectItem value="shrtfly">ShrtFly</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.getValues().type === "lootlabs" && (
              <FormField
                control={form.control}
                name="apiUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Url</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit">Sumbit</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
