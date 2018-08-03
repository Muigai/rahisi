import path from "path";
import webpack from "webpack";

const config: webpack.Configuration = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/control-extensions.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: true,
};

export default config;
