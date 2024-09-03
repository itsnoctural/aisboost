const salt = "U5ipKucUTuum8ICavcAibTm13zx8Ah0acw9NgwBsBbQZ7VkeCI6SQea75seKQY6r";

async function getDerivedKey(array16Salt: Uint8Array) {
  const encodedSalt = new TextEncoder().encode(salt);
  const baseKey = await crypto.subtle.importKey(
    "raw",
    encodedSalt,
    { name: "PBKDF2" },
    false,
    ["deriveKey"],
  );

  const algorithm = {
    name: "PBKDF2",
    salt: array16Salt,
    iterations: 100000,
    hash: "SHA-256",
  };

  return crypto.subtle.deriveKey(
    algorithm,
    baseKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt"],
  );
}

async function getEncryptedLink(link: string) {
  const uint16array = crypto.getRandomValues(new Uint8Array(16));
  const uint12array = crypto.getRandomValues(new Uint8Array(12));
  const derivedKey = await getDerivedKey(uint16array);
  const textCoded = new TextEncoder().encode(link);

  const encoderLink = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: uint12array,
    },
    derivedKey,
    textCoded,
  );

  const fromArrayBuffer = new Uint8Array(encoderLink);
  const fromByteLengths = new Uint8Array(
    uint16array.byteLength +
      uint12array.byteLength +
      fromArrayBuffer.byteLength,
  );

  fromByteLengths.set(uint16array, 0);
  fromByteLengths.set(uint12array, uint16array.byteLength);
  fromByteLengths.set(
    fromArrayBuffer,
    uint16array.byteLength + uint12array.byteLength,
  );

  const a = new Uint8Array(fromByteLengths);
  const b = Array.from(a);
  return btoa(String.fromCharCode(...b));
}

export async function workink(dest: string, url: string) {
  const encryptedLink = await getEncryptedLink(dest);
  return `${url}?r=${encodeURI(btoa(encryptedLink))}`;
}
