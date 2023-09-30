import {fileURLToPath, URL} from "node:url";
import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import {VantResolver} from "unplugin-vue-components/resolvers";
import mkcert from "vite-plugin-mkcert";
import {viteObfuscateFile} from "vite-plugin-obfuscator";

export default ({mode}) =>
  defineConfig({
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      }),
      mkcert(),
      //加密混淆
      viteObfuscateFile({
        compact: true,
        controlFlowFlattening: false,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: false,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: false,
        debugProtectionInterval: 0,
        disableConsoleOutput: false,
        domainLock: [],
        domainLockRedirectUrl: 'about:blank',
        forceTransformStrings: [],
        identifierNamesCache: null,
        identifierNamesGenerator: 'hexadecimal',
        identifiersDictionary: [],
        identifiersPrefix: '',
        ignoreImports: false,
        inputFileName: '',
        log: false,
        numbersToExpressions: false,
        optionsPreset: 'default',
        renameGlobals: false,
        renameProperties: false,
        renamePropertiesMode: 'safe',
        reservedNames: [],
        reservedStrings: [],
        seed: 0,
        selfDefending: false,
        simplify: true,
        sourceMap: false,
        sourceMapBaseUrl: '',
        sourceMapFileName: '',
        sourceMapMode: 'separate',
        sourceMapSourcesMode: 'sources-content',
        splitStrings: false,
        splitStringsChunkLength: 10,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayCallsTransformThreshold: 0.5,
        stringArrayEncoding: [],
        stringArrayIndexesType: [
          'hexadecimal-number'
        ],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 1,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersType: 'variable',
        stringArrayThreshold: 0.75,
        target: 'browser',
        transformObjectKeys: false,
        unicodeEscapeSequence: false
      })
    ],
    server: {
      https: false,
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: "https://api.ipify.org?format=json",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ""),
        },
        "/DEV-USER": {
          target: loadEnv(mode, process.cwd()).VITE_API_USER_PROXY,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/DEV-USER/, ""),
        },
        "/DEV-DECLARE": {
          target: loadEnv(mode, process.cwd()).VITE_API_DECLARE_PROXY,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/DEV-DECLARE/, ""),
        },
        "/ws": {
          target: 'https://apis.map.qq.com',
          changeOrigin: true
        },
      },
    },
    define: {"process.env": {}},
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
