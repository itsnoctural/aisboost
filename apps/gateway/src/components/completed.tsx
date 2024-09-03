import { BsClipboard, BsClipboardCheck } from "solid-icons/bs";
import { createSignal } from "solid-js";
import { Button } from "./ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

function getTimeRemaining(date: Date) {
  const total = +new Date(date) - +new Date();
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor(total / (1000 * 60 * 60));

  return `${hours} hours and ${minutes} minutes`;
}

export function Completed(props: { key: string; expiresAt: Date }) {
  const [copied, setCopied] = createSignal(false);

  function onCopy() {
    navigator.clipboard.writeText(props.key);
    setCopied(true);

    const handler = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Successfully completed</CardTitle>
        <CardDescription>
          Now you have access to the application, you have{" "}
          {getTimeRemaining(props.expiresAt)} left.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-y-2 px-6 text-center">
          <span class="rounded bg-muted px-2 py-1">{props.key}</span>
          <Button class="flex gap-x-1" onClick={() => onCopy()}>
            {copied() ? <BsClipboardCheck /> : <BsClipboard />}
            {copied() ? "Copied" : "Copy"}
          </Button>
        </div>
      </CardContent>
    </>
  );
}
