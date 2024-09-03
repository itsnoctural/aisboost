import { linkvertise } from "./linkvertise";
import { lootlabs } from "./lootlabs";
import { workink } from "./workink";

export const platforms: {
  [key: string]: (
    dest: string,
    apiKey: string,
    apiUrl: string | null,
  ) => Promise<string>;
} = {
  linkvertise,
  lootlabs,
  workink,
};
