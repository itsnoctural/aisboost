export function MarketingWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex w-full max-w-screen-xl">
      <div className="flex w-full flex-col items-center gap-y-8">
        {children}
      </div>
    </main>
  );
}
