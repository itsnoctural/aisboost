export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex w-full max-w-screen-xl min-h-screen my-4">
      <div className="flex flex-col gap-y-6 w-full rounded-lg border border-border p-4 md:p-8 bg-background/85">
        {children}
      </div>
    </main>
  );
}
