var webpack = require('webpack');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    entry: {
        'app': './src/main.ts'
      },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ]
            },
            {
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