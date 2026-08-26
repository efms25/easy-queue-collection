import { appendFile, mkdir } from "node:fs/promises";

export async function log(text: string): Promise<void> {
  const date = new Date().toISOString().slice(0, 10);

  await mkdir("./logs", { recursive: true });

  const file = `./logs/${date}.log`;

  await appendFile(
    file,
    `[${new Date().toISOString()}] ${text}`
  )
}
