export function getCookie(name: string): string | undefined {
  const cookies = document.cookie
    .split(';')
    .map(s => s.trimStart())
    .map(s => s.split('=', 2))
    .filter(c => c.length === 2);
  for (const c of cookies) {
    if (c[0] === name) {
      return c[1];
    }
  }
  return undefined;
}

export function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}`;
}
