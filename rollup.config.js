import nodeResolve from "@rollup/plugin-node-resolve";
import css from "rollup-plugin-import-css";
import postcss from 'rollup-plugin-postcss'

export default {
    input: "src/app.js",
    output: {
      dir: "dist",
      format: "iife"
    },
    plugins: [
      postcss({
        // inject: false, // У бираем создание нового CSS файла
        extract: "bundle.css", // Также убираем экстракцию в отдельный файл
        // minimize: true, // Вы можете минимизировать CSS, если нужно
      }),
      css(), nodeResolve()
    ]
}