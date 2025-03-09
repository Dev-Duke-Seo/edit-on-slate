import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import image from "@rollup/plugin-image";
import copy from "rollup-plugin-copy";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json";

export default {
	input: "src/lib/index.ts",
	output: [
		{
			file: "dist/index.js",
			format: "cjs",
			sourcemap: true,
		},
		{
			file: "dist/index.esm.js",
			format: "esm",
			sourcemap: true,
		},
	],
	plugins: [
		peerDepsExternal({
			includeDependencies: true,
		}),
		resolve({
			extensions: [".js", ".jsx", ".ts", ".tsx"],
		}),
		commonjs(),
		postcss({
			extensions: ['.css'],
			minimize: true,
			inject: false,
			extract: false
		}),
		typescript({
			tsconfig: "./tsconfig.json",
			exclude: ["**/__tests__/**", "**/*.test.ts", "**/*.test.tsx"],
			compilerOptions: {
				sourceMap: true,
				declaration: true,
				declarationDir: "dist",
			},
		}),
		terser(),
		image(),
		copy({
			targets: [
				{ src: "src/assets/icons/*", dest: "dist/assets/icons" },
				{ src: "src/fonts.css", dest: "dist" },
				{ src: "src/components/**/*.ts", dest: "dist/src/components" },
				{ src: "src/components/**/*.tsx", dest: "dist/src/components" },
				{ src: "src/utils/**/*.ts", dest: "dist/src/utils" },
				{ src: "src/plugins/**/*.ts", dest: "dist/src/plugins" },
				{ src: "src/lib/**/*.ts", dest: "dist/src/lib" },
			],
		}),
	],
	external: ["react", "react-dom", "@emotion/styled"],
};
