export default function imageLoader({ src }: { src: string }): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (src.startsWith("http") || src.startsWith(base)) return src;
  return `${base}${src}`;
}
