import { Button } from "./ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function NotFound() {
  return (
    <>
      <CardHeader>
        <CardTitle>Not Found</CardTitle>
        <CardDescription>
          The author or page you were looking for was not found.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="px-8">
          <Button class="w-full" as="a" href="/">
            Home
          </Button>
        </div>
      </CardContent>
    </>
  );
}
