export async function linkvertise(dest: string, id: string) {
  const base = `https://linkvertise.com/${id}/${Math.random() * 1000}/dynamic`;
  return `${base}?r=${btoa(encodeURI(dest))}`;
}
