var webpack = require('webpack');

module.exports = {
    entry: './src/main.ts',
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader",
                options: {
                    includePaths: [		
                        'node_modules/@angular-mdl/popover',
                        'node_modules/@angular-mdl/select'
                    ]
                }
            }]
        }]
    },
    output: {
        filename: 'bundle.js',
    }
};