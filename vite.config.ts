import {
    defineConfig,
    Plugin,
    loadEnv,
    UserConfigFn,
    normalizePath,
} from 'vite'

import { resolve } from "node:path"
import react from '@vitejs/plugin-react'
import packagejson from "./package.json"
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath } from 'node:url'
// import https from 'vite-plugin-mkcert'//https
import https from "@vitejs/plugin-basic-ssl"//https
// import { visualizer } from "rollup-plugin-visualizer"
// import viteCompression from 'vite-plugin-compression';
import htmlConfig from 'vite-plugin-html-config';
import path from "path"
import fs from "fs"
import os from 'os';

function getLocalIPv4() {
    const interfaces = os.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
        for (const config of iface) {
            if (config.family === 'IPv4' && !config.internal) {
                return config.address;
            }
        }
    }
    return '127.0.0.1'; // 如果没有找到，返回本地回环地址
}

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const debug = console.log
function copyFileToFile_plugin(srcpath: string, destpath: string): Plugin {
    return {
        name: 'copyFileToFile_plugin',
        apply: 'build',
        async generateBundle(): Promise<any> {
            return new Promise(ok => {
                const readStream = fs.createReadStream(srcpath);
                const dir = path.dirname(destpath)
                if (!fs.existsSync(dir)) {
                    try {
                        fs.mkdirSync(dir);
                    } catch (err) {
                        throw new Error(JSON.stringify(err));
                    }
                }
                const writeStream = fs.createWriteStream(destpath);
                readStream.pipe(writeStream);
                writeStream.on('finish', () => {
                    ok('File was copied to destination');
                });
            })
        }
    };
}
function variableToFile_plugin(jsonobject: object, destpath: string): Plugin {
    return {
        name: 'vite-variableToFile_plugin',
        apply: "build",
        async generateBundle(): Promise<any> {
            const jsonData = JSON.stringify(jsonobject);
            console.log(jsonData);
            // return fs.writeFileSync(destpath, jsonData);
        }
    }
}
function parseArgs() {
    const args = process.argv//.slice(2)
    const result: Record<string, string> = {};
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg.startsWith('--')) {
            const name = arg.slice(2);
            let value = "";
            if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
                value = args[i + 1];
                i++;
            }
            result[name] = value;
        }
    }
    return result;
}
// const { mode, outDir } = parseArgs()
// console.log({ mode, outDir })
const webconfig: UserConfigFn = ({ command, mode }) => {
    const tsxName = "web.tsx"
    const cwdPath = normalizePath(process.cwd())
    const tsxPath = normalizePath(path.resolve(cwdPath, "src", mode, tsxName))
    debug({ mode,command, cwdPath, tsxPath, env: loadEnv(mode, process.cwd()) })
    if (!fs.existsSync(tsxPath)) {
        // const apps = fs.readdirSync(srcPath).filter(v => fs.existsSync(path.resolve(srcPath, v, tsxName))).map(v => `pnpm run dev --mode ${v}`);
        // debug(apps)
        throw new Error("!fs.existsSync(tsxPath) pnpm run dev --mode 带有app.tsx的目录")
    }
    const title = `${packagejson.name}/${mode}`
    const buildToPath = normalizePath(path.resolve(cwdPath, `${title}-build`))
    // debug({ title, buildToPath })
    //console.log(import.meta,"/////2222222//////")
    // const env = loadEnv(mode, process.cwd(), '')
    return {
        server: {
            host: getLocalIPv4(),
            open: true,
            https: mode=="pcbDz002/web",
            // proxy: {
            //     '/api': 'http://localhost:3000'
            // }
        },
        plugins: [
            tsconfigPaths(),
            react(),
            htmlConfig({
                title,
                scripts: [
                    {
                        type: 'module',
                        src: tsxPath.replace(cwdPath, ""),
                    },
                ],
            }),
            https()
            //variableToFile_plugin(mcu00,path.resolve(buildToPath, "config.json")),
            // copyFileToFile_plugin(
            //     path.resolve(srcPath, "config.json"),
            //     path.resolve(buildToPath, "config.json")
            // ),
            // viteCompression({ deleteOriginFile: true }),//压缩gzib
            // visualizer({
            //     filename: './stats.html',
            //     open: true, // 自动打开报告
            //     sourcemap: true,
            //     gzipSize: true,
            //     brotliSize: true,
            //     template: 'treemap' // 报告类型
            // })//代码分析报告
        ],
        build: {
            minify: "terser",//清理垃圾
            terserOptions: {
                compress: {
                    drop_console: true,//清console
                    drop_debugger: true,//清debugger
                },
            },
            emptyOutDir: true,//打包前清空
            assetsDir: './',
            outDir: buildToPath,
            sourcemap: false,
            rollupOptions: {
                //input: './src/mcu00_server/main.ts',
                output: {
                    entryFileNames: '[name][hash:6].js',
                    chunkFileNames: '[name][hash:6].js',
                    assetFileNames: '[name][hash:6].[ext]',
                },
            },
        },
    }
}

export default defineConfig(webconfig)