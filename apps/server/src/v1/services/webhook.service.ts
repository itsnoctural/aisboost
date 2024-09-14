export async function send(
  url: string,
  content: string,
  data: { key: string; hwid: string; expiresAt: Date },
) {
  const formatted = content
    .replace("{key}", data.key)
    .replace("{hwid}", data.hwid)
    .replace(
      "{expire}",
      Math.round(data.expiresAt.getTime() / 1000).toString(),
    );

  const thumbnail: { url?: string } = {};

  if (Number.parseInt(data.hwid)) {
    const user = await fetch(
      `https://www.roblox.com/avatar-thumbnails?params=[{userId:${data.hwid}}]`,
    ).then((response) => response.json());

    if (user[0]?.thumbnailUrl) {
      thumbnail.url = user[0].thumbnailUrl;
    }
  }

  return await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          description: formatted,
          thumbnail,
          footer: {
            text: "aisboost.com",
          },
          color: 5814783,
        },
      ],
    }),
  });
}
