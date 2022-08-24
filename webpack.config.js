const defaults = require('@wordpress/scripts/config/webpack.config');

module.exports = {
    ...defaults,
    entry: {
        ...defaults.entry,
        'index': './src/index.js',
        'shortcodes/csa-signup-shortcode/csa-signup-shortcode': './src/shortcodes/csa-signup/index.js',
    },
    externals: {
        // react: 'React',
        // 'react-dom': 'ReactDOM',
    },
};