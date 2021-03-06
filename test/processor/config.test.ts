import { resolve } from "path";
import { toType } from "../../src/utils/tools";
import { Processor } from "../../src/lib";

const configPath = resolve("./test/assets/tailwind.config.js");
const userConfig = require(configPath);

describe("Config", () => {
  const baseConfig = new Processor();

  it("dict input", () => {
    const processor = new Processor(userConfig);
    expect(processor.config("theme.screens")).toEqual(
      processor.theme("screens")
    );
    expect(processor.theme("screens")).toEqual(userConfig.theme.screens);
    expect(processor.theme("colors")).toEqual(userConfig.theme.colors);
    expect(processor.theme("colors.pink")).toEqual(
      userConfig.theme.colors.pink
    );
    expect(processor.theme("fontFamily")).toEqual(userConfig.theme.fontFamily);
    expect(processor.theme("spacing")).toEqual({
      ...(toType(baseConfig.theme("spacing"), "object") ?? {}),
      ...userConfig.theme.extend.spacing,
    });
    expect(processor.theme("borderRadius")).toEqual({
      ...(toType(baseConfig.theme("borderRadius"), "object") ?? {}),
      ...userConfig.theme.extend.borderRadius,
    });
  });

  it("change separator test", () => {
    const processor = new Processor({ separator: "_" });
    expect(processor.interpret("sm_bg-black").styleSheet.build()).toBe(
      "@media (min-width: 640px) {\n  .sm_bg-black {\n    --tw-bg-opacity: 1;\n    background-color: rgba(0, 0, 0, var(--tw-bg-opacity));\n  }\n}"
    );
  });

  it("add prefix test", () => {
    const processor = new Processor({ prefix: "tw-" });
    expect(processor.interpret("sm:tw-bg-black").styleSheet.build()).toBe(
      "@media (min-width: 640px) {\n  .sm\\:tw-bg-black {\n    --tw-bg-opacity: 1;\n    background-color: rgba(0, 0, 0, var(--tw-bg-opacity));\n  }\n}"
    );
  });

  it("important test", () => {
    const processor = new Processor({ important: true });
    expect(processor.interpret("sm:bg-black").styleSheet.build()).toBe(
      "@media (min-width: 640px) {\n  .sm\\:bg-black {\n    --tw-bg-opacity: 1 !important;\n    background-color: rgba(0, 0, 0, var(--tw-bg-opacity)) !important;\n  }\n}"
    );
  });

  it("important string test", () => {
    const processor = new Processor({ important: "#app" });
    expect(processor.interpret("sm:bg-black").styleSheet.build()).toBe(
      "@media (min-width: 640px) {\n  #app .sm\\:bg-black {\n    --tw-bg-opacity: 1;\n    background-color: rgba(0, 0, 0, var(--tw-bg-opacity));\n  }\n}"
    );
    expect(processor.interpret("dark:bg-white").styleSheet.build()).toBe(
      ".dark #app .dark\\:bg-white {\n  --tw-bg-opacity: 1;\n  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));\n}"
    );
  });
});
