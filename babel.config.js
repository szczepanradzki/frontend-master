module.exports = {
    presets: [
        "@babel/preset-react",
        [
            "@babel/preset-env", {
            modules: false
        }
        ]
    ],
    plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-syntax-dynamic-import"
    ],
    env: {
        production: {
            plugins: [["inline-dotenv",{
                path: '.env.production'
            }]]
        },
        development: {
            plugins: [["inline-dotenv",{
                path: '.env.development'
            }]]
        }
    }
};
