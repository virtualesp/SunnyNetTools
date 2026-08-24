import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import wails from "@wailsio/runtime/plugins/vite";

// Wails dev 使用 http://wails.localhost:<port>。vite 生成的资源 URL 必须与 WebView 地址栏同源，
// 否则动态 import 会报 Failed to fetch dynamically imported module / ERR_ABORTED 502。
// dev:frontend 任务注入 VITE_WAILS_ORIGIN（优先），否则按 VITE_PORT 默认 9245 推导。
function wailsDevServerOrigin() {
    if (process.env.VITE_WAILS_ORIGIN) return process.env.VITE_WAILS_ORIGIN;
    const p = String(process.env.VITE_PORT || process.env.PORT || "9245").replace(/[^0-9]/g, "");
    const port = p || "9245";
    return `http://wails.localhost:${port}`;
}

const devOrigin = wailsDevServerOrigin();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), wails("./bindings")],
    server: {
        host: true,
        strictPort: true,
        port: Number(process.env.VITE_PORT) || Number(process.env.PORT) || 9245,
        ...(devOrigin ? {origin: devOrigin} : {}),
    },
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                replace: 'ReplaceBody.html',
                other: 'Other.html',
                debugTools: 'debugTools.html',
                cert: 'Cert.html',
                theme: 'Theme.html',
                themeDesign: 'ThemeDesign.html'
            }
        }
    }
});
