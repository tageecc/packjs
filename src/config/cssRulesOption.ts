import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/**
 * css rules
 * @param options packjs配置
 * @param config webpack配置
 */
export const generateCSSRules = (options, config) => {
    const getLoaders = (useCssModule) =>
        [
            styleLoader(options.isDev),
            cssLoader(useCssModule),
            postcssLoader(options),
            options.less && lessLoader(),
        ].filter(Boolean);

    if (options.disableCSSModules) {
        config.module.rules.push({
            test: /\.(css|less)$/,
            use: getLoaders(false),
            exclude: /node_modules/,
        });
    } else {
        config.module.rules.push({
            test: /\.?global.(css|less)$/,
            use: getLoaders(true),
            exclude: /node_modules/,
        });
        config.module.rules.push({
            test: /^((?!\.?global).)*(css|less)$/,
            use: getLoaders(false),
            exclude: /node_modules/,
        });
    }
};

export function styleLoader(isDev?) {
    return isDev ? 'style-loader' : MiniCssExtractPlugin.loader;
}
export function cssLoader(useCssModule, options = {}) {
    if (!useCssModule)
        return {
            loader: 'css-loader',
            options: options,
        };
    return {
        loader: 'css-loader',
        options: options || {
            modules: {
                exportLocalsConvention: 'camelCase',
                localIdentName: '[name]__[local]--[hash:base64:5]',
            },
        },
    };
}

export function postcssLoader(options?) {
    options = options || {};
    const postCssLoader = {
        loader: 'postcss-loader',
        options: { postcssOptions: { plugins: options.postcssPlugins || [] } },
    };

    if (options.mobile) {
        postCssLoader.options.postcssOptions.plugins.push([
            'postcss-px-to-viewport',
            {
                unitPrecision: 5,
                viewportUnit: 'vw',
                minPixelValue: 1,
                mediaQuery: false,
                selectorBlackList: ['.ignore'],
                viewportWidth: options.mobile === true ? 750 : options.mobile,
            },
        ]);
    }

    return postCssLoader.options.postcssOptions.plugins.length && postCssLoader;
}

export function lessLoader(options = {}) {
    return { loader: 'less-loader', options };
}
