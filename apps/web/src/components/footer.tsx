import Link from "next/link";

export function Footer() {
  return (
    <footer className="z-50 w-full bg-background border-t border-border">
      <div className="flex flex-col mx-auto w-full max-w-screen-xl px-6 py-4 items-center">
        <span>&copy; 2024 aisboost</span>
        <div className="flex gap-x-3 text-muted-foreground">
          <Link href={"/privacy"}>Privacy Policy</Link>
          <Link href={"/tos"}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
