"use client";

import { api } from "@/lib/api/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type Application = {
  id: number;
  name: string;
  duration: number;
  checkpoints: number;
  keyPrefix: string;
  keyLength: number;
  webhook?: string;
  webhookContent?: string;
};

const applicationSchema = z.object({
  name: z.string().min(2).max(32),
  duration: z.coerce.number().min(1),
  checkpoints: z.coerce.number().min(1).max(5),
  keyPrefix: z.string().min(1).max(5),
  keyLength: z.coerce.number().min(6).max(24),
  webhook: z
    .string()
    .regex(/^https:\/\/discord\.com\/api\/webhooks\/\d+\/[\w-]+$/)
    .optional()
    .or(z.literal("")),

  webhookContent: z.optional(z.string().max(256)),
});

export function ApplicationForm({
  defaultValues,
}: { defaultValues?: Application }) {
  const form = useForm<Application>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      duration: defaultValues?.duration ?? 24,
      checkpoints: defaultValues?.checkpoints ?? 1,
      keyPrefix: defaultValues?.keyPrefix ?? "KEY",
      keyLength: defaultValues?.keyLength ?? 12,
      webhook: defaultValues?.webhook ?? "",
      webhookContent: defaultValues?.webhookContent ?? "",
    },
  });

  const router = useRouter();

  async function onSubmit(data: Application) {
    if (defaultValues)
      await api.v1.applications({ id: defaultValues.id }).index.patch({
        ...data,
        webhook: data.webhook === "" ? null : data.webhook,
        webhookContent: data.webhookContent === "" ? null : data.webhookContent,
      });
    else await api.v1.applications.index.post(data);

    router.push("./");
    router.refresh();
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="AisBoost Inc." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public application name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (in hours)</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} />
                  </FormControl>
                  <FormDescription>How long the key will last</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="checkpoints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Checkpoints</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      placeholder="1"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    How many steps are needed to get the key
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keyPrefix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Prefix</FormLabel>
                  <FormControl>
                    <Input minLength={1} maxLength={5} {...field} />
                  </FormControl>
                  <FormDescription>Example: KEY_zt9vniw3rlfz</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keyLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Length</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={6}
                      max={24}
                      placeholder="12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {defaultValues && (
              <>
                <FormField
                  control={form.control}
                  name="webhook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Webhook URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="discord.com/api/webhooks/..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="webhookContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Webhook Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            "{key} just was generated for {hwid}.\nExpire: <t:{expire}:R>"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <Button type="submit">Sumbit</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
