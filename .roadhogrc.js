module.exports = {
    "hash": true,
    "entry": "src/index.js",
    "extraBabelPlugins": [
        "transform-runtime",
        "transform-decorators-legacy",
        "transform-class-properties",
        ["import", {"libraryName": "antd", "libraryDirectory": "es", "style": true}],
        [
            "react-css-modules",
            {
                "generateScopedName": "[local]-[hash:base64:5]",
                "webpackHotModuleReloading": true,
                "filetypes": {
                    ".less": {
                        "syntax": "postcss-less"
                    }
                }
            }
        ]
    ],
    "env": {
        "development": {
            "extraBabelPlugins": [
                "dva-hmr"
            ]
        }
    },
    "externals": {
        "g2": "G2",
        "g-cloud": "Cloud",
        "g2-plugin-slider": "G2.Plugin.slider"
    },
    "ignoreMomentLocale": true,
    "theme": "./src/theme.js",
    "cssModulesExclude": [
        "./src/index.less"
    ],
    // 业务页面所在目录，用来构建路由以及init state，字符串或者数组
    "pagePath": "./src/pages/**/*.jsx",
    // "pagePath": [
    //     "./src/pages/reserve/**/*.jsx",
    //     "./src/pages/sale/**/*.jsx",
    // ],

    // 忽略文件，不进行构建，提供部分模块打包功能，一般是配合补充 pagePath 进行使用，字符串或者数组
    "pageIgnore": [
        // "**/ActionsExample.jsx",
    ],

    "modelPath": [
        "./src/models/**/*.js",
        "./src/pages/**/model.js",
        "./src/pages/**/*.model.js",
    ],
    "modelIgnore": [
        "**/index.js",
        "**/all-models.js"
    ],

    "proxy": {
        // "/api/page-generator": {
        //     "target": "http://localhost:5000"
        // },
        "/api/commodity/opera": {
            // "target": "http://172.16.42.219:8081",
            "target": "http://39.105.57.189:1297",
            "pathRewrite": {
                '^/api': '',
            }
        },
        "/api/customer": {
            // "target": "http://172.16.42.219:8081",
            target: 'http://39.105.57.189:1297/',
            "pathRewrite": {
                '^/api': '',
            }
        },
        "/api/manager/opera/getActiveInfo": {
            // "target": "http://172.16.42.219:8081",
            target: 'http://39.105.57.189:1292/',
            "pathRewrite": {
                '^/api': '',
            }
        },
        "/api": {
            // "target": "http://172.16.42.219:8081",
            target: 'http://39.105.57.189:1299/',
            "pathRewrite": {
                '^/api': '',
            }
        },
        // "/graphql": {
        //     "target": "http://localhost:4000"
        // }

}
}
