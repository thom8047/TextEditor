const path = require("path");

module.exports = {
    entry: "./client/scripts/exec.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "client/dist"),
    },
    mode: "development",
};
