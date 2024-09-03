import { Button } from "~/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function Home() {
  return (
    <>
      <CardHeader>
        <CardTitle class="text-2xl">It's just gateway.</CardTitle>
        <CardDescription>
          We help creators monetize their content. Get started now. More details
          on our website.
        </CardDescription>
      </CardHeader>
      <CardContent class="flex">
        <Button class="w-full" as="a" href={import.meta.env.VITE_HOME_URL}>
          Website
        </Button>
        <Button
          class="ml-3 w-full"
          variant={"outline"}
          as="a"
          href={`${import.meta.env.VITE_HOME_URL}/dashboard`}
        >
          Dashboard
        </Button>
      </CardContent>
    </>
  );
}
