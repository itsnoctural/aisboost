export interface IPage {
  title: string;
  href: string;
  out?: boolean;
}

export const marketingConfig: IPage[] = [
  {
    title: "Showcase",
    href: "https://gw.aisboost.com/a/1?hwid=player",
  },
  {
    title: "Contact",
    href: "/discord",
  },
  {
    title: "Documentation",
    href: "/docs",
  },
];

export const dashboardConfig: IPage[] = [
  { title: "Applications", href: "/" },
  { title: "Support", href: "/discord", out: true },
];
