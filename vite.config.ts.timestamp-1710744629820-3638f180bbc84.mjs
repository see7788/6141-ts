// vite.config.ts
import {
  defineConfig,
  loadEnv,
  normalizePath
} from "file:///F:/ml/458/6141/node_modules/.pnpm/vite@4.5.2_@types+node@16.18.11_less@3.13.1_terser@5.28.1/node_modules/vite/dist/node/index.js";
import react from "file:///F:/ml/458/6141/node_modules/.pnpm/@vitejs+plugin-react@3.1.0_vite@4.5.2/node_modules/@vitejs/plugin-react/dist/index.mjs";

// package.json
var package_default = {
  name: "ts",
  version: "0.0.0",
  type: "module",
  description: 'esno src/store.t.ts vite\u7684\u6838\u5FC3\u7528\u4E8E\u6267\u884Cts,"publishConfig": {"registry": "https://registry.npmjs.org/"},',
  scripts: {
    preinstall: "npx only-allow pnpm",
    dev: "vite --host 0.0.0.0",
    build: "tsc && vite build",
    preview: "vite preview",
    server: "nodemon --exec 'esno ./src/pcbAll/node/server.ts'"
  },
  dependencies: {
    "@ant-design/icons": "^5.0.1",
    "@ant-design/plots": "^1.2.5",
    "@nosferatu500/react-sortable-tree": "^4.4.0",
    "@socket.io/admin-ui": "^0.5.1",
    "@vitejs/plugin-basic-ssl": "^1.0.2",
    aedes: "^0.50.0",
    "aedes-server-factory": "^0.2.1",
    antd: "^5.1.7",
    "array-to-tree": "^3.3.2",
    express: "4.18.2",
    "express-session": "^1.18.0",
    "file-box": "^1.4.15",
    immer: "9.0.19",
    "js-md5": "^0.8.3",
    lodash: "^4.17.21",
    mqtt: "^5.3.1",
    mysql2: "^3.9.1",
    "qrcode-terminal": "^0.12.0",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "react-img-editor": "^0.2.2",
    "react-router-dom": "^6.8.0",
    "react-use": "^17.4.0",
    recharts: "^2.6.0",
    "socket.io": "^4.7.2",
    "socket.io-client": "^4.7.2",
    "usehooks-ts": "^2.9.1",
    uuid: "^9.0.1",
    "vanilla-jsoneditor": "^0.19.0",
    "vite-express": "^0.11.1",
    web3: "^4.2.2",
    wechaty: "^1.20.2",
    "wechaty-puppet-wechat": "^1.18.4",
    ws: "^8.16.0",
    zustand: "4.3.3"
  },
  devDependencies: {
    "@types/express": "4.17.17",
    "@types/express-session": "^1.17.10",
    "@types/lodash": "^4.14.191",
    "@types/node": "16.18.11",
    "@types/qrcode-terminal": "^0.12.2",
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@types/uuid": "^9.0.8",
    "@types/w3c-web-serial": "^1.0.3",
    "@types/web-bluetooth": "^0.0.16",
    "@types/ws": "^8.5.10",
    "@vitejs/plugin-react": "^3.1.0",
    esm: "^3.2.25",
    nodemon: "^3.0.1",
    "rollup-plugin-visualizer": "^5.9.0",
    terser: "^5.16.3",
    typescript: "5.0.2",
    vite: "^4.1.0",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-html-config": "^1.0.11",
    "vite-plugin-mkcert": "^1.16.0",
    "vite-tsconfig-paths": "^4.3.1"
  }
};

// vite.config.ts
import tsconfigPaths from "file:///F:/ml/458/6141/node_modules/.pnpm/vite-tsconfig-paths@4.3.1_typescript@5.0.2_vite@4.5.2/node_modules/vite-tsconfig-paths/dist/index.mjs";
import { fileURLToPath } from "node:url";
import https from "file:///F:/ml/458/6141/node_modules/.pnpm/@vitejs+plugin-basic-ssl@1.1.0_vite@4.5.2/node_modules/@vitejs/plugin-basic-ssl/dist/index.mjs";
import htmlConfig from "file:///F:/ml/458/6141/node_modules/.pnpm/vite-plugin-html-config@1.0.11_vite@4.5.2/node_modules/vite-plugin-html-config/dist/index.js";
import path from "path";
import fs from "fs";
var __vite_injected_original_import_meta_url = "file:///F:/ml/458/6141/ts/vite.config.ts";
var __dirname = fileURLToPath(new URL(".", __vite_injected_original_import_meta_url));
var debug = console.log;
var webconfig = ({ command, mode }) => {
  const tsxName = "web.tsx";
  const cwdPath = normalizePath(process.cwd());
  const tsxPath = normalizePath(path.resolve(cwdPath, "src", mode, tsxName));
  debug({ command, cwdPath, tsxPath, env: loadEnv(mode, process.cwd()) });
  if (!fs.existsSync(tsxPath)) {
    throw new Error("!fs.existsSync(tsxPath) pnpm run dev --mode \u5E26\u6709app.tsx\u7684\u76EE\u5F55");
  }
  const title = `${package_default.name}-${mode}`;
  const buildToPath = normalizePath(path.resolve(cwdPath, `${title}-build`));
  debug({ title, buildToPath });
  return {
    server: {
      open: true,
      https: true
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
            type: "module",
            src: tsxPath.replace(cwdPath, "")
          }
        ]
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
    // resolve: {
    //     alias: {
    //         '@uipublic': resolve(__dirname, './src/dz002/cppWeb/public/'),
    //         '@ui': resolve(__dirname, './src/dz002/cppWeb/protected/'),//tsconfig.ts的paths加上 "@ui/*": ["./src/webProtected/*"],
    //     }
    // },
    build: {
      minify: "terser",
      //清理垃圾
      terserOptions: {
        compress: {
          drop_console: true,
          //清console
          drop_debugger: true
          //清debugger
        }
      },
      emptyOutDir: true,
      //打包前清空
      assetsDir: "./",
      outDir: buildToPath,
      sourcemap: false,
      rollupOptions: {
        //input: './src/mcu00_server/main.ts',
        output: {
          entryFileNames: "[name][hash:6].js",
          chunkFileNames: "[name][hash:6].js",
          assetFileNames: "[name][hash:6].[ext]"
        }
      }
    }
  };
};
var vite_config_default = defineConfig(webconfig);
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxcbWxcXFxcNDU4XFxcXDYxNDFcXFxcdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXG1sXFxcXDQ1OFxcXFw2MTQxXFxcXHRzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9tbC80NTgvNjE0MS90cy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7XG4gICAgZGVmaW5lQ29uZmlnLFxuICAgIFBsdWdpbixcbiAgICBsb2FkRW52LFxuICAgIFVzZXJDb25maWdGbixcbiAgICBub3JtYWxpemVQYXRoLFxufSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJub2RlOnBhdGhcIlxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHBhY2thZ2Vqc29uIGZyb20gXCIuL3BhY2thZ2UuanNvblwiXG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJ1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xuLy8gaW1wb3J0IGh0dHBzIGZyb20gJ3ZpdGUtcGx1Z2luLW1rY2VydCcvL2h0dHBzXG5pbXBvcnQgaHR0cHMgZnJvbSBcIkB2aXRlanMvcGx1Z2luLWJhc2ljLXNzbFwiLy9odHRwc1xuLy8gaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIlxuLy8gaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XG5pbXBvcnQgaHRtbENvbmZpZyBmcm9tICd2aXRlLXBsdWdpbi1odG1sLWNvbmZpZyc7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXG5pbXBvcnQgZnMgZnJvbSBcImZzXCJcbmNvbnN0IF9fZGlybmFtZSA9IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLicsIGltcG9ydC5tZXRhLnVybCkpXG5jb25zdCBkZWJ1ZyA9IGNvbnNvbGUubG9nXG5mdW5jdGlvbiBjb3B5RmlsZVRvRmlsZV9wbHVnaW4oc3JjcGF0aDogc3RyaW5nLCBkZXN0cGF0aDogc3RyaW5nKTogUGx1Z2luIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnY29weUZpbGVUb0ZpbGVfcGx1Z2luJyxcbiAgICAgICAgYXBwbHk6ICdidWlsZCcsXG4gICAgICAgIGFzeW5jIGdlbmVyYXRlQnVuZGxlKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2Uob2sgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRTdHJlYW0gPSBmcy5jcmVhdGVSZWFkU3RyZWFtKHNyY3BhdGgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZShkZXN0cGF0aClcbiAgICAgICAgICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlyKSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnMubWtkaXJTeW5jKGRpcik7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KGVycikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHdyaXRlU3RyZWFtID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oZGVzdHBhdGgpO1xuICAgICAgICAgICAgICAgIHJlYWRTdHJlYW0ucGlwZSh3cml0ZVN0cmVhbSk7XG4gICAgICAgICAgICAgICAgd3JpdGVTdHJlYW0ub24oJ2ZpbmlzaCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb2soJ0ZpbGUgd2FzIGNvcGllZCB0byBkZXN0aW5hdGlvbicpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiB2YXJpYWJsZVRvRmlsZV9wbHVnaW4oanNvbm9iamVjdDogb2JqZWN0LCBkZXN0cGF0aDogc3RyaW5nKTogUGx1Z2luIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAndml0ZS12YXJpYWJsZVRvRmlsZV9wbHVnaW4nLFxuICAgICAgICBhcHBseTogXCJidWlsZFwiLFxuICAgICAgICBhc3luYyBnZW5lcmF0ZUJ1bmRsZSgpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICAgICAgY29uc3QganNvbkRhdGEgPSBKU09OLnN0cmluZ2lmeShqc29ub2JqZWN0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGpzb25EYXRhKTtcbiAgICAgICAgICAgIC8vIHJldHVybiBmcy53cml0ZUZpbGVTeW5jKGRlc3RwYXRoLCBqc29uRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBwYXJzZUFyZ3MoKSB7XG4gICAgY29uc3QgYXJncyA9IHByb2Nlc3MuYXJndi8vLnNsaWNlKDIpXG4gICAgY29uc3QgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGFyZyA9IGFyZ3NbaV07XG4gICAgICAgIGlmIChhcmcuc3RhcnRzV2l0aCgnLS0nKSkge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGFyZy5zbGljZSgyKTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICBpZiAoaSArIDEgPCBhcmdzLmxlbmd0aCAmJiAhYXJnc1tpICsgMV0uc3RhcnRzV2l0aCgnLS0nKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gYXJnc1tpICsgMV07XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0W25hbWVdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8vIGNvbnN0IHsgbW9kZSwgb3V0RGlyIH0gPSBwYXJzZUFyZ3MoKVxuLy8gY29uc29sZS5sb2coeyBtb2RlLCBvdXREaXIgfSlcbmNvbnN0IHdlYmNvbmZpZzogVXNlckNvbmZpZ0ZuID0gKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XG4gICAgY29uc3QgdHN4TmFtZSA9IFwid2ViLnRzeFwiXG4gICAgY29uc3QgY3dkUGF0aCA9IG5vcm1hbGl6ZVBhdGgocHJvY2Vzcy5jd2QoKSlcbiAgICBjb25zdCB0c3hQYXRoID0gbm9ybWFsaXplUGF0aChwYXRoLnJlc29sdmUoY3dkUGF0aCwgXCJzcmNcIiwgbW9kZSwgdHN4TmFtZSkpXG4gICAgZGVidWcoeyBjb21tYW5kLCBjd2RQYXRoLCB0c3hQYXRoLCBlbnY6IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSkgfSlcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmModHN4UGF0aCkpIHtcbiAgICAgICAgLy8gY29uc3QgYXBwcyA9IGZzLnJlYWRkaXJTeW5jKHNyY1BhdGgpLmZpbHRlcih2ID0+IGZzLmV4aXN0c1N5bmMocGF0aC5yZXNvbHZlKHNyY1BhdGgsIHYsIHRzeE5hbWUpKSkubWFwKHYgPT4gYHBucG0gcnVuIGRldiAtLW1vZGUgJHt2fWApO1xuICAgICAgICAvLyBkZWJ1ZyhhcHBzKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCIhZnMuZXhpc3RzU3luYyh0c3hQYXRoKSBwbnBtIHJ1biBkZXYgLS1tb2RlIFx1NUUyNlx1NjcwOWFwcC50c3hcdTc2ODRcdTc2RUVcdTVGNTVcIilcbiAgICB9XG4gICAgY29uc3QgdGl0bGUgPSBgJHtwYWNrYWdlanNvbi5uYW1lfS0ke21vZGV9YFxuICAgIGNvbnN0IGJ1aWxkVG9QYXRoID0gbm9ybWFsaXplUGF0aChwYXRoLnJlc29sdmUoY3dkUGF0aCwgYCR7dGl0bGV9LWJ1aWxkYCkpXG4gICAgZGVidWcoeyB0aXRsZSwgYnVpbGRUb1BhdGggfSlcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgICAgIG9wZW46IHRydWUsXG4gICAgICAgICAgICBodHRwczogdHJ1ZSxcbiAgICAgICAgICAgIC8vIHByb3h5OiB7XG4gICAgICAgICAgICAvLyAgICAgJy9hcGknOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJ1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9LFxuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICB0c2NvbmZpZ1BhdGhzKCksXG4gICAgICAgICAgICByZWFjdCgpLFxuICAgICAgICAgICAgaHRtbENvbmZpZyh7XG4gICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgc2NyaXB0czogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbW9kdWxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogdHN4UGF0aC5yZXBsYWNlKGN3ZFBhdGgsIFwiXCIpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGh0dHBzKClcbiAgICAgICAgICAgIC8vdmFyaWFibGVUb0ZpbGVfcGx1Z2luKG1jdTAwLHBhdGgucmVzb2x2ZShidWlsZFRvUGF0aCwgXCJjb25maWcuanNvblwiKSksXG4gICAgICAgICAgICAvLyBjb3B5RmlsZVRvRmlsZV9wbHVnaW4oXG4gICAgICAgICAgICAvLyAgICAgcGF0aC5yZXNvbHZlKHNyY1BhdGgsIFwiY29uZmlnLmpzb25cIiksXG4gICAgICAgICAgICAvLyAgICAgcGF0aC5yZXNvbHZlKGJ1aWxkVG9QYXRoLCBcImNvbmZpZy5qc29uXCIpXG4gICAgICAgICAgICAvLyApLFxuICAgICAgICAgICAgLy8gdml0ZUNvbXByZXNzaW9uKHsgZGVsZXRlT3JpZ2luRmlsZTogdHJ1ZSB9KSwvL1x1NTM4Qlx1N0YyOWd6aWJcbiAgICAgICAgICAgIC8vIHZpc3VhbGl6ZXIoe1xuICAgICAgICAgICAgLy8gICAgIGZpbGVuYW1lOiAnLi9zdGF0cy5odG1sJyxcbiAgICAgICAgICAgIC8vICAgICBvcGVuOiB0cnVlLCAvLyBcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTYyQTVcdTU0NEFcbiAgICAgICAgICAgIC8vICAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgICAgICAgICAvLyAgICAgZ3ppcFNpemU6IHRydWUsXG4gICAgICAgICAgICAvLyAgICAgYnJvdGxpU2l6ZTogdHJ1ZSxcbiAgICAgICAgICAgIC8vICAgICB0ZW1wbGF0ZTogJ3RyZWVtYXAnIC8vIFx1NjJBNVx1NTQ0QVx1N0M3Qlx1NTc4QlxuICAgICAgICAgICAgLy8gfSkvL1x1NEVFM1x1NzgwMVx1NTIwNlx1Njc5MFx1NjJBNVx1NTQ0QVxuICAgICAgICBdLFxuICAgICAgICAvLyByZXNvbHZlOiB7XG4gICAgICAgIC8vICAgICBhbGlhczoge1xuICAgICAgICAvLyAgICAgICAgICdAdWlwdWJsaWMnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2R6MDAyL2NwcFdlYi9wdWJsaWMvJyksXG4gICAgICAgIC8vICAgICAgICAgJ0B1aSc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvZHowMDIvY3BwV2ViL3Byb3RlY3RlZC8nKSwvL3RzY29uZmlnLnRzXHU3Njg0cGF0aHNcdTUyQTBcdTRFMEEgXCJAdWkvKlwiOiBbXCIuL3NyYy93ZWJQcm90ZWN0ZWQvKlwiXSxcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgYnVpbGQ6IHtcbiAgICAgICAgICAgIG1pbmlmeTogXCJ0ZXJzZXJcIiwvL1x1NkUwNVx1NzQwNlx1NTc4M1x1NTczRVxuICAgICAgICAgICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgICAgICAgICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSwvL1x1NkUwNWNvbnNvbGVcbiAgICAgICAgICAgICAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSwvL1x1NkUwNWRlYnVnZ2VyXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbXB0eU91dERpcjogdHJ1ZSwvL1x1NjI1M1x1NTMwNVx1NTI0RFx1NkUwNVx1N0E3QVxuICAgICAgICAgICAgYXNzZXRzRGlyOiAnLi8nLFxuICAgICAgICAgICAgb3V0RGlyOiBidWlsZFRvUGF0aCxcbiAgICAgICAgICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgICAgICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgLy9pbnB1dDogJy4vc3JjL21jdTAwX3NlcnZlci9tYWluLnRzJyxcbiAgICAgICAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdbbmFtZV1baGFzaDo2XS5qcycsXG4gICAgICAgICAgICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAnW25hbWVdW2hhc2g6Nl0uanMnLFxuICAgICAgICAgICAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ1tuYW1lXVtoYXNoOjZdLltleHRdJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh3ZWJjb25maWcpIiwgIntcbiAgXCJuYW1lXCI6IFwidHNcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjBcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJlc25vIHNyYy9zdG9yZS50LnRzIHZpdGVcdTc2ODRcdTY4MzhcdTVGQzNcdTc1MjhcdTRFOEVcdTYyNjdcdTg4NEN0cyxcXFwicHVibGlzaENvbmZpZ1xcXCI6IHtcXFwicmVnaXN0cnlcXFwiOiBcXFwiaHR0cHM6Ly9yZWdpc3RyeS5ucG1qcy5vcmcvXFxcIn0sXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJwcmVpbnN0YWxsXCI6IFwibnB4IG9ubHktYWxsb3cgcG5wbVwiLFxuICAgIFwiZGV2XCI6IFwidml0ZSAtLWhvc3QgMC4wLjAuMFwiLFxuICAgIFwiYnVpbGRcIjogXCJ0c2MgJiYgdml0ZSBidWlsZFwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxuICAgIFwic2VydmVyXCI6XCJub2RlbW9uIC0tZXhlYyAnZXNubyAuL3NyYy9wY2JBbGwvbm9kZS9zZXJ2ZXIudHMnXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGFudC1kZXNpZ24vaWNvbnNcIjogXCJeNS4wLjFcIixcbiAgICBcIkBhbnQtZGVzaWduL3Bsb3RzXCI6IFwiXjEuMi41XCIsXG4gICAgXCJAbm9zZmVyYXR1NTAwL3JlYWN0LXNvcnRhYmxlLXRyZWVcIjogXCJeNC40LjBcIixcbiAgICBcIkBzb2NrZXQuaW8vYWRtaW4tdWlcIjogXCJeMC41LjFcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLWJhc2ljLXNzbFwiOiBcIl4xLjAuMlwiLFxuICAgIFwiYWVkZXNcIjogXCJeMC41MC4wXCIsXG4gICAgXCJhZWRlcy1zZXJ2ZXItZmFjdG9yeVwiOiBcIl4wLjIuMVwiLFxuICAgIFwiYW50ZFwiOiBcIl41LjEuN1wiLFxuICAgIFwiYXJyYXktdG8tdHJlZVwiOiBcIl4zLjMuMlwiLFxuICAgIFwiZXhwcmVzc1wiOiBcIjQuMTguMlwiLFxuICAgIFwiZXhwcmVzcy1zZXNzaW9uXCI6IFwiXjEuMTguMFwiLFxuICAgIFwiZmlsZS1ib3hcIjogXCJeMS40LjE1XCIsXG4gICAgXCJpbW1lclwiOiBcIjkuMC4xOVwiLFxuICAgIFwianMtbWQ1XCI6IFwiXjAuOC4zXCIsXG4gICAgXCJsb2Rhc2hcIjogXCJeNC4xNy4yMVwiLFxuICAgIFwibXF0dFwiOiBcIl41LjMuMVwiLFxuICAgIFwibXlzcWwyXCI6IFwiXjMuOS4xXCIsXG4gICAgXCJxcmNvZGUtdGVybWluYWxcIjogXCJeMC4xMi4wXCIsXG4gICAgXCJyZWFjdFwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWltZy1lZGl0b3JcIjogXCJeMC4yLjJcIixcbiAgICBcInJlYWN0LXJvdXRlci1kb21cIjogXCJeNi44LjBcIixcbiAgICBcInJlYWN0LXVzZVwiOiBcIl4xNy40LjBcIixcbiAgICBcInJlY2hhcnRzXCI6IFwiXjIuNi4wXCIsXG4gICAgXCJzb2NrZXQuaW9cIjogXCJeNC43LjJcIixcbiAgICBcInNvY2tldC5pby1jbGllbnRcIjogXCJeNC43LjJcIixcbiAgICBcInVzZWhvb2tzLXRzXCI6IFwiXjIuOS4xXCIsXG4gICAgXCJ1dWlkXCI6IFwiXjkuMC4xXCIsXG4gICAgXCJ2YW5pbGxhLWpzb25lZGl0b3JcIjogXCJeMC4xOS4wXCIsXG4gICAgXCJ2aXRlLWV4cHJlc3NcIjogXCJeMC4xMS4xXCIsXG4gICAgXCJ3ZWIzXCI6IFwiXjQuMi4yXCIsXG4gICAgXCJ3ZWNoYXR5XCI6IFwiXjEuMjAuMlwiLFxuICAgIFwid2VjaGF0eS1wdXBwZXQtd2VjaGF0XCI6IFwiXjEuMTguNFwiLFxuICAgIFwid3NcIjogXCJeOC4xNi4wXCIsXG4gICAgXCJ6dXN0YW5kXCI6IFwiNC4zLjNcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAdHlwZXMvZXhwcmVzc1wiOiBcIjQuMTcuMTdcIixcbiAgICBcIkB0eXBlcy9leHByZXNzLXNlc3Npb25cIjogXCJeMS4xNy4xMFwiLFxuICAgIFwiQHR5cGVzL2xvZGFzaFwiOiBcIl40LjE0LjE5MVwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCIxNi4xOC4xMVwiLFxuICAgIFwiQHR5cGVzL3FyY29kZS10ZXJtaW5hbFwiOiBcIl4wLjEyLjJcIixcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4wLjI3XCIsXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjAuMTBcIixcbiAgICBcIkB0eXBlcy91dWlkXCI6IFwiXjkuMC44XCIsXG4gICAgXCJAdHlwZXMvdzNjLXdlYi1zZXJpYWxcIjogXCJeMS4wLjNcIixcbiAgICBcIkB0eXBlcy93ZWItYmx1ZXRvb3RoXCI6IFwiXjAuMC4xNlwiLFxuICAgIFwiQHR5cGVzL3dzXCI6IFwiXjguNS4xMFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjogXCJeMy4xLjBcIixcbiAgICBcImVzbVwiOiBcIl4zLjIuMjVcIixcbiAgICBcIm5vZGVtb25cIjogXCJeMy4wLjFcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiOiBcIl41LjkuMFwiLFxuICAgIFwidGVyc2VyXCI6IFwiXjUuMTYuM1wiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIjUuMC4yXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjQuMS4wXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiOiBcIl4wLjUuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4taHRtbC1jb25maWdcIjogXCJeMS4wLjExXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1ta2NlcnRcIjogXCJeMS4xNi4wXCIsXG4gICAgXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI6IFwiXjQuMy4xXCJcbiAgfVxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBK087QUFBQSxFQUMzTztBQUFBLEVBRUE7QUFBQSxFQUVBO0FBQUEsT0FDRztBQUVQLE9BQU8sV0FBVzs7O0FDUmxCO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxNQUFRO0FBQUEsRUFDUixh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
