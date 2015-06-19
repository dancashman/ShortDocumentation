"use strict";

var src  = "src",  // files to dev on;
    dist = "dist", // where production ready files are written to;
    docs = "docs"; // where documentation files are written to;

module.exports = {
    // helper functions need these base values;
    "src": src,
    // delete documentation and the build;
    "clean": {
        "dist": dist,
        "docs": docs
    },
    // web server and synchronised browser testing;
    "browsersync": {
        // configure what gets served;
        "server": {
            "baseDir": "./",  // set the root to be the base, this way we can go to docs, and build;
            "directory": true // enable directory browsing;
        },
        // configure the URL to access the server;
        "host": "localhost",
        "port": 3000
    },
    // configure the watches for each gulp task we want to run;
    "watch": {
        "jade": [
            src + "/**/*.jade",
            src + "/**/_*.json"
        ],
        "scss": [
            src + "/**/*.scss"
        ],
        "js":   [
            src + "/**/*.js"
        ],
        "copy": [
            src + "/**/*{txt,ico}",
            src + "/fonts/*",
            src + "/**/-*.json",
            src + "/img/*",
            "!" + src + "/img/sprite/**/!(icon-sprite.png)"
        ]
    },
    // generate HTML;
    "jade": {
        "pages": {
            // these files will be compiled;
            // don't include partials (those are being included somewhere else);
            // and don't include the documentation pages;
            "compile": [src + "/pages/**/*.jade", "!" + src + "/pages/_docs/*", "!" + src + "/pages/**/_*.jade"],
            // to this location (files will have a new filename);
            "dest": {
                "dist": dist + "/html",
                "docs": docs + "/html"
            }
        },
        // modules for the documentation (the build doesn't need individual modules);
        "modules": {
            // for each demo.jade, we'll create a page for the module;
            // this is the wrapper Jade for the module;
            "module": [src + "/modules/**/demo*.jade"],
            // this is the iframe page we're putting the module into;
            "iframe": [src + "/pages/_docs/_iframe.jade"],
            // and this is where the iframe HTML is compiled;
            "dest": docs + "/html"
        },
        "documentation": {
            "template": src + "/pages/_docs/default.jade",
            "dest": docs
        }
    },
    // generate CSS for the documentation and the build;
    "scss": {
        "compile": [src + "/scss/*.scss", "!" + src + "/scss/_*.scss"],
        "dest": {
            "dist": dist + "/css",
            "docs": docs + "/css"
        },
        "maps": "./",
        // config for a plugin that fixes CSS with browser prefixes;
        "autoprefixer": {
            "browsers": [
                "last 2 versions",
                "safari 5",
                "ie 8",
                "ie 9",
                "opera 12.1",
                "ios 6",
                "android 4"
            ],
            "cascade": true
        }
    },
    // concatenate JS files for the documentation and the build;
    "js": {
        // enable source maps;
        "debug": true,
        // enable file names and size reporting in the console;
        "showFiles": {
            "showFiles": true
        },
        // a separate bundle will be generated for each item;
        "input": [
            "./" + src + "/pages/_docs/page.js",
            "./" + src + "/pages/home/page.js",
            "./" + src + "/pages/landing/page.js",
            "./" + src + "/pages/article/page.js"
        ],
        // the bundle is written to the following two locations;
        "output": {
            // order of files must be the same;
            "dist": [
                "./" + dist + "/js/page-home.js", // make sure the documentation JS is overwritten in build;
                "./" + dist + "/js/page-home.js",
                "./" + dist + "/js/page-landing.js",
                "./" + dist + "/js/page-article.js"
            ],
            "docs": [
                "./" + docs + "/js/page-documentation.js",
                "./" + docs + "/js/page-home.js",
                "./" + docs + "/js/page-landing.js",
                "./" + docs + "/js/page-article.js"
            ]
        },
        // name the bundle that will contain common JS (shared across multiple bundles);
        "common": "common.js",
        // where this common file lives (for the build process);
        "src": "./" + src + "/js",
        // where this common file is written to;
        // it's written to two places, but it's only read from one;
        "dest": {
            "dist": dist + "/js",
            "docs": docs + "/js"
        }
    },
    // copy none generated files to the documentation and the build;
    "copy": {
        // copy over any remaining file types that aren't handled by the other tasks;
        // these aren't altered in anyway, it's a straight copy;
        "compile": {
            "dist": [
                // include any text, or icon file (in the root);
                src + "*.{txt,ico}",
                // include the fonts;
                src + "/**/*.ttf",
                // and include only the JSON files used for Ajax;
                src + "/**/-*.json",
                // get all images;
                src + "/**/*.{gif,png,jpg,jpeg,svg,ico}",
                // except generated images;
                "!" + src + "/img/sprite/**/!(icon-sprite.png)",
                // and their source material;
                "!" + src + "/img/sprite/",
                "!" + src + "/img/sprite/*"
            ],
            "docs": [
                // include any text, or icon file (in the root);
                src + "*.{txt,ico}",
                // include the fonts;
                src + "/**/*.ttf",
                // include the module and page files for display;
                src + "/**/*.{json,md,jade,scss,js}",
                // get all images;
                src + "/**/*.{gif,png,jpg,jpeg,svg,ico}",
                // except generated images;
                "!" + src + "/img/sprite/**/!(icon-sprite.png)",
                // and their source material;
                "!" + src + "/img/sprite/",
                "!" + src + "/img/sprite/*",
                // and documentation pages;
                "!" + src + "/**/demo.jade",
                // and includes (not visible through the docs anyway);
                "!" + src + "/includes/*",
                // and scss (not visible through the docs anyway);
                "!" + src + "/scss/*"
            ]
        },
        "dest": {
            "dist": dist,
            "docs": docs
        }
    }
};
