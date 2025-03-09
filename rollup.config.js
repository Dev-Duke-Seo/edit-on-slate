import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
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
		peerDepsExternal(),
		resolve({
			extensions: [".js", ".jsx", ".ts", ".tsx"],
		}),
		commonjs(),
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
	],
	external: ["react", "react-dom", "@emotion/styled", "slate", "slate-react"],
};
