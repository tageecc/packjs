const HOME_PATH = 'https://github.com/tageecc/packjs';

export default {
    base: '/',
    publicPath: `/`,
    exportStatic: {},
    dynamicImport: {},
    mode: 'site',
    title: 'packjs',
    logo: 'https://gw.alicdn.com/tfs/TB1ILY9YUH1gK0jSZSyXXXtlpXa-742-996.png',
    favicon: 'https://gw.alicdn.com/tfs/TB1ILY9YUH1gK0jSZSyXXXtlpXa-742-996.png',
    navs: {
        'en-US': [null, { title: 'GitHub', path: HOME_PATH }],
        'zh-CN': [null, { title: 'GitHub', path: HOME_PATH }],
    },
    analytics: {
        ga: 'G-ZNJQM7Q9TP',
    },
};
