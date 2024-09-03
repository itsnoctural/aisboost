"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";

export function SignIn() {
  const router = useRouter();

  return (
    <main className="flex h-screen items-center">
      <Card className="mx-auto w-full max-w-sm bg-background">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Choose the preferred login method.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-y-3">
          <Button
            className="w-full gap-x-2"
            onClick={() =>
              router.push(`${process.env.NEXT_PUBLIC_API}/v1/auth/link/google`)
            }
          >
            Continue with Google
            <FaGoogle />
          </Button>
          <Button
            variant="outline"
            className="w-full gap-x-2"
            onClick={() =>
              router.push(`${process.env.NEXT_PUBLIC_API}/v1/auth/link/google`)
            }
          >
            Continue with GitHub
            <FaGithub />
          </Button>
        </CardContent>
        <CardFooter className="text-center">
          <CardDescription>
            By clicking continue, you agree to our{" "}
            <Link
              href={"/tos"}
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href={"/privacy"}
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </CardDescription>
        </CardFooter>
      </Card>
    </main>
  );
}
