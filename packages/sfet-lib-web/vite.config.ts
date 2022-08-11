import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import dts from 'vite-plugin-dts'

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'));

const target: string = process.env.TARGET;
if (!target) {
    throw new Error('Target component must be specified.');
}
const dist: string = process.env.DIST;
const name: string = process.env.NAME;

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    return {
        publicDir: false,
        define: {
            // __VERSION__: JSON.stringify(pkg.version)
        },
        plugins: [
            vue(),
            dts({
                exclude: ['node_modules', 'src'],
                outputDir: resolve(__dirname, 'dist/type'),
                compilerOptions: { sourceMap: true },
                beforeWriteFile(filePath, content) {

                    return { filePath, content }
                }
            })
        ],
        build: {
            outDir: dist,
            emptyOutDir: true,
            sourcemap: true,
            lib: {
                entry: target + '/index.ts',
                name: name,
                formats: ['es'],
                fileName: (format) => `index.js`
            },
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                external: ['vue'],
                output: {
                    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    globals: {
                        vue: 'Vue'
                    }
                }
            }
        }
    };
});
