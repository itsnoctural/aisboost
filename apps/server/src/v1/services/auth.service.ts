import { error } from "elysia";

export async function getUserGithub(accessToken: string) {
  const { id } = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then((response) => {
    if (!response.ok) throw error(400);

    return response.json();
  });

  const email = await fetch("https://api.github.com/user/emails", {
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then(async (response) => {
    if (!response.ok) throw error(400);

    const emails = await response.json();

    for (let i = 0; i < emails.length; i++) {
      if (emails[i].primary) return emails[i].email;
    }
  });

  return { id, email };
}

export async function getUserGoogle(accessToken: string) {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw error(400);

  return res.json();
}
