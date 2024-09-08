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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type KeyInput = {
  hwid: string;
  duration: number;
};

const keySchema = z.object({
  hwid: z.string(),
  duration: z.coerce.number(),
});

export function KeyForm({ application }: { application: string }) {
  const form = useForm<KeyInput>({
    resolver: zodResolver(keySchema),
    defaultValues: {
      hwid: "",
    },
  });

  const router = useRouter();

  async function onSubmit(data: KeyInput) {
    await api.v1.keys({ application }).index.post(data);

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
              name="hwid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HWID</FormLabel>
                  <FormControl>
                    <Input placeholder="player123" {...field} />
                  </FormControl>
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
                    <Input placeholder="24" type="number" min={1} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Sumbit</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
