#!/usr/bin/env node

const {launch} = require('chrome-launcher');
const path = require('path');

const dist = path.resolve(__dirname, '..', 'dist');
const chromeFlags = [`--load-extension=${dist}`];

const chromePath = (() => {
    for (let i = 0; i < process.argv.length; i++) {
        if (process.argv[i] === '--chromePath' && i + 1 < process.argv.length) {
            return process.argv[i + 1];
        }
    }
})();

launch({
    enableExtensions: true,
    chromePath,
    chromeFlags
});
