import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
} from "unocss";

export default defineConfig({
  shortcuts: {
    border: "border border-solid border-[#dee6f3]",
  },
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
