import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
} from "unocss";

export default defineConfig({
  content: {
    pipeline: {
      include: ["src/**"],
    },
  },
  presets: [
    presetUno(), // 添加 UnoCSS 的默认样式预设
    presetAttributify(),
    presetIcons({
      warn: true,
      prefix: ["i-"],
      extraProperties: {
        display: "inline-block",
      },
    }),
  ],
});
