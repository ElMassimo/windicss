import { ClassParser } from "../../src/utils/parser";

describe("ClassParser", () => {
  it("parse", () => {
    const classes =
      "font-bold text-green-300 dark:font-medium dark:p-4 -sm:border +sm:float-right md: hover:  (bg-black-300 text-gray-200   text-lg dark:(bg-black-300 text-gray-200)) md:text-red-500 hover:  text-red-300 text-green-300 sm:hover:bg-red-500 dark:hover:bg-black-300 sm:dark:hover:bg-gray-300 abc bg-cool-gray-300 bg-hex-fff bg-rgb(32,31,22) bg-raw(#fff) bg-rgba(255, 0, 0, 0.3) bg-hsl(0, 100%, 25%) bg-hsla(0, 100%, 50%, 0.5)";
    const parser = new ClassParser();
    expect(parser.parse().length).toBe(0);
    parser.classNames = classes;
    expect(parser.parse()).toEqual([
      {
        raw: "font-bold",
        variants: [],
        content: "font-bold",
        type: "utility",
      },
      {
        raw: "text-green-300",
        variants: [],
        content: "text-green-300",
        type: "utility",
      },
      {
        raw: "dark:font-medium",
        variants: ["dark"],
        content: "font-medium",
        type: "utility",
      },
      {
        raw: "dark:p-4",
        variants: ["dark"],
        content: "p-4",
        type: "utility",
      },
      {
        raw: "-sm:border",
        variants: ["-sm"],
        content: "border",
        type: "utility",
      },
      {
        raw: "+sm:float-right",
        variants: ["+sm"],
        content: "float-right",
        type: "utility",
      },
      {
        raw:
          "md: hover:  (bg-black-300 text-gray-200   text-lg dark:(bg-black-300 text-gray-200))",
        variants: ["md", "hover"],
        content: [
          {
            raw: "bg-black-300",
            variants: [],
            content: "bg-black-300",
            type: "utility",
          },
          {
            raw: "text-gray-200",
            variants: [],
            content: "text-gray-200",
            type: "utility",
          },
          {
            raw: "text-lg",
            variants: [],
            content: "text-lg",
            type: "utility",
          },
          {
            raw: "dark:(bg-black-300 text-gray-200)",
            variants: ["dark"],
            content: [
              {
                raw: "bg-black-300",
                variants: [],
                content: "bg-black-300",
                type: "utility",
              },
              {
                raw: "text-gray-200",
                variants: [],
                content: "text-gray-200",
                type: "utility",
              },
            ],
            type: "group",
          },
        ],
        type: "group",
      },
      {
        raw: "md:text-red-500",
        variants: ["md"],
        content: "text-red-500",
        type: "utility",
      },
      {
        raw: "hover:  text-red-300",
        variants: ["hover"],
        content: "text-red-300",
        type: "utility",
      },
      {
        raw: "sm:hover:bg-red-500",
        variants: ["sm", "hover"],
        content: "bg-red-500",
        type: "utility",
      },
      {
        raw: "dark:hover:bg-black-300",
        variants: ["dark", "hover"],
        content: "bg-black-300",
        type: "utility",
      },
      {
        raw: "sm:dark:hover:bg-gray-300",
        variants: ["sm", "dark", "hover"],
        content: "bg-gray-300",
        type: "utility",
      },
      {
        raw: "abc",
        variants: [],
        content: "abc",
        type: "utility",
      },
      {
        raw: "bg-cool-gray-300",
        variants: [],
        content: "bg-cool-gray-300",
        type: "utility",
      },
      {
        raw: "bg-hex-fff",
        variants: [],
        content: "bg-hex-fff",
        type: "utility",
      },
      {
        raw: "bg-rgb(32,31,22)",
        variants: [],
        func: "bg-rgb",
        content: "32,31,22",
        type: "func",
      },
      {
        raw: "bg-raw(#fff)",
        variants: [],
        func: "bg-raw",
        content: "#fff",
        type: "func",
      },
      {
        raw: "bg-rgba(255, 0, 0, 0.3)",
        variants: [],
        func: "bg-rgba",
        content: "255, 0, 0, 0.3",
        type: "func",
      },
      {
        raw: "bg-hsl(0, 100%, 25%)",
        variants: [],
        func: "bg-hsl",
        content: "0, 100%, 25%",
        type: "func",
      },
      {
        raw: "bg-hsla(0, 100%, 50%, 0.5)",
        variants: [],
        func: "bg-hsla",
        content: "0, 100%, 50%, 0.5",
        type: "func",
      },
    ]);
  });
});
