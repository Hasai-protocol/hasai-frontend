const webpack = require("webpack");
const {
    override,
    useBabelRc: babelRc,
    addWebpackPlugin,
    fixBabelImports,
    addLessLoader,
    adjustStyleLoaders,
} = require("customize-cra");

process.env.GENERATE_SOURCEMAP = "false";

module.exports = override(
    (config, env) => {
        if (env === "development") {
            config.devtool = "eval-cheap-module-source-map";
        }
        config.resolve = {
            ...config.resolve,
            fallback: {
                ...config.resolve.fallback,
                url: require.resolve("url"),
                fs: require.resolve("fs"),
                assert: require.resolve("assert"),
                crypto: require.resolve("crypto-browserify"),
                http: require.resolve("stream-http"),
                https: require.resolve("https-browserify"),
                os: require.resolve("os-browserify/browser"),
                buffer: require.resolve("buffer"),
                stream: require.resolve("stream-browserify"),
            },
        };
        config.plugins.push(
            new webpack.ProvidePlugin({
                process: "process/browser",
                Buffer: ["buffer", "Buffer"],
            })
        );

        return config;
    },
    babelRc(),
    fixBabelImports("import", {
        libraryName: "antd",
        style: "css",
        libraryDirectory: "es",
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
                "@primary-color": "#CDFF8C",
                "@border-radius-base": "4px",
                "@box-shadow-base": "none",
                "@border-color-base": "rgba(100, 113, 141, 0.5)",
                "@text-color": "#fff",
                "@text-color-secondary": "rgba(255,255,255,0.6)",
            },
        },
    }),
    adjustStyleLoaders(({ use: [, , postcss] }) => {
        const postcssOptions = postcss.options;
        postcss.options = { postcssOptions };
    }),
    addWebpackPlugin(
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 100000, // Minimum number of characters
        })
    )
);
