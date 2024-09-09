import type { ParentComponent } from "solid-js";
import { Background } from "./background";
import { Card, CardFooter } from "./ui/card";

export const Layout: ParentComponent = (props) => {
  return (
    <>
      <Background />
      <main class="flex h-full items-center p-4">
        <div class="flex flex-col mx-auto w-full max-w-md">
          <Card>
            {props.children}
            <CardFooter class="flex w-full justify-center gap-x-2">
              <a
                href={`${import.meta.env.VITE_HOME_URL}/tos`}
                class="underline underline-offset-4 hover:text-primary text-sm text-muted-foreground"
              >
                Terms of Service
              </a>

              <a
                href={`${import.meta.env.VITE_HOME_URL}/privacy`}
                class="underline underline-offset-4 hover:text-primary text-sm text-muted-foreground"
              >
                Privacy Policy
              </a>
              <a
                href={`${import.meta.env.VITE_HOME_URL}/discord`}
                class="underline underline-offset-4 hover:text-primary text-sm text-muted-foreground"
              >
                Support
              </a>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
};
