import { error } from "elysia";

async function encrypt(dest: string, apiKey: string) {
  return await fetch(
    `https://be.lootlabs.gg/api/lootlabs/url_encryptor?destination_url=${dest}&api_token=${apiKey}`,
  ).then(async (response) => {
    if (!response.ok) throw error(400, "Bad Request. Invalid API Key");

    const data = await response.json();
    return data.message;
  });
}

export async function lootlabs(
  dest: string,
  apiKey: string,
  apiUrl: string | null,
) {
  return `${apiUrl}&data=${await encrypt(dest, apiKey)}`;
}
