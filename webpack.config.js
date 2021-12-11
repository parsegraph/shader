const path = require("path");

module.exports = {
  externals: {
    "parsegraph-checkglerror":{
      commonjs:"parsegraph-checkglerror",
      commonjs2:"parsegraph-checkglerror",
      amd:"parsegraph-checkglerror",
      root:"parsegraph_checkglerror"
    }
  },
  entry: path.resolve(__dirname, "src/shader.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "parsegraph-shader.js",
    globalObject: "this",
    library: "parsegraph_shader",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx?)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ["ts-shader-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".glsl"],
    modules: [
      path.resolve(__dirname, "src"),
      path.resolve(__dirname, "node_modules"),
    ]
  },
  mode: "development",
  devtool: "eval-source-map",
};
