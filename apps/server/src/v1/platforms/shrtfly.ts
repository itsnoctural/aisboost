import { error } from "elysia";

export async function shrtfly(
  dest: string,
  apiKey: string,
  apiUrl: string | null,
) {
  return await fetch(
    `https://shrtfly.com/api?api=${apiKey}&url=${encodeURIComponent(dest)}&format=json`,
  ).then(async (response) => {
    if (!response.ok)
      throw error(
        400,
        "Bad Request. An error occurred during link generation.",
      );

    const data = await response.json();
    return data.result.shorten_url;
  });
}
