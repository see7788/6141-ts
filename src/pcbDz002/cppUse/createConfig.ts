//path.dirname(fileURLToPath(import.meta.url)

import { config } from "./t"
import path from "node:path"
import fs from "node:fs"
const { outDir } = Object.fromEntries(process.argv.slice(2).map(v => v.replace("--", "")).map(v => v.split("="))) as { outDir: string };
let echo: any = { outDir };
if (!outDir) {
    console.error({ ...echo, e: "!outDir" });
    process.exit(1)
} else {
    try {
        echo = { ...echo, data: JSON.stringify(config, null, 2) };
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.resolve(outDir, "config.json"), JSON.stringify(config), { flag: 'w' });
        process.exit(0)
    } catch (e) {
        console.error("js console", { ...echo, e });
        process.exit(1);
    }
}