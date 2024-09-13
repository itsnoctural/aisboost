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

  return await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          description: formatted,
          footer: {
            text: "aisboost.com",
          },
          color: 5814783,
        },
      ],
    }),
  });
}
