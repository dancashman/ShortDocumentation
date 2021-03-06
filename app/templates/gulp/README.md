# Short Documentation Gulp

## What have I installed?

```bash
.
└── gulp                            # Gulp tasks and configuration;
    ├── README.md                   # what you are reading now;
    ├── config.js                   # settings for Gulp (intended to be edited);
    ├── helpers                     # helper functions for the Gulp tasks;
    |   ├── data-content.js         # builds a JS object of `module` content for Jade parsing (dist);
    |   ├── data-documentation.js   # builds a JS object of `module` and `page` content for Jade parsing (docs);
    |   ├── data-js.js              # builds a JS object of files to parse, and generate for browserify;
    |   ├── handle-errors.js        # simple error handling for Gulp streams;
    |   ├── rename-module.js        # rename module-based pages for the documentation;
    |   └── rename-page.js          # rename page-based pages for the documentation, and the distribution;
    └── tasks                       # tasks for Gulp to run; the files above this folder are configuration settings;
        ├── browser-sync.js         # web server;
        ├── build.js                # build the distribution, and the documentation;
        ├── clean.js                # delete the generated files;
        ├── copy.js                 # straight copy of files that don't need to be parsed;
        ├── default.js              # dist, docs, and the default (dist and docs) tasks;
        ├── jade-modules.js         # build the documentation pages for each `module` in the project;
        ├── jade-pages-index.js     # build the distribution index page (list of all pages in the project);
        ├── jade-pages.js           # build the distribution and documentation pages for each `page` in the project;
        ├── jade.js                 # run all the Jade tasks;
        ├── js.js                   # compile ES6 JavaScript to ES5 with browserify, factor-bundle, and babelify;
        ├── open.js                 # open start pages for the distribution and the documentation;
        ├── scss.js                 # compile CSS;
        └── watch.js                # set watch tasks to trigger rebuilding of assets;
```
## config.js

The property names in config map to the tasks they are used for.

```JavaScript
{
    "src": "",         // mapping to the "src" for the helper functions; (in case the folder name is changed);
    "clean": {},       // settings for the clean task;
    "open": {},        // settings for the open task;
    "browsersync": {}, // settings for the browsersync task; // starting to see the pattern yet?;
    "watch": {},       // settings for the watch task;
    "jade": {},        // settings for the jade task;
    "scss": {},        // settings for the scss task;
    "js": {},          // settings for the js task;
    "copy": {}         // settings for the copy task;
};
```

## Common tasks to run

```bash
$ gulp
```

`gulp dist` will generate both the documentation and the distribution builds, and set a watch for each.

<br>

```bash
$ gulp docs
```

`gulp docs` will generate the documentation build, and set a watch for this build.

<br>

```bash
$ gulp dist
```

`gulp dist` will generate the distribution build, and set a watch for this build.

## Map of significant Gulp tasks

I seem to really like making these trees.

```bash
$ gulp default                      # default gulp task;
├── build                           # build and copy all files;
├── browsersync                     # start up a web server;
├── watch                           # start watching files for changes - so we can push updates to browsersync;
└── open                            # open the distribution and documentation in a browser;

$ gulp dist                         # run all gulp tasks needed to generate the distribution build;
├── build:dist
|   ├── clean:dist                  # remove any existing files in the destination;
|   ├── jade:dist                   # compile HTML;
|   |   ├── jade:pages:dist         # compile all the page HTML;
|   |   └── jade:pages:index:dist   # compile the index file for the pages;
|   ├── js:dist                     # lint and compile JavaScript;
|   ├── scss:dist                   # lint and compile CSS;
|   └── copy:dist                   # copy (no processing) of all the files defined in the config file;
├── browsersync
├── watch:dist
└── open:dist

$ gulp docs                         # same as all the above tasks, but for the documentation app instead of the distribution build;
├── build:docs
|   ├── clean:docs
|   ├── jade:docs                   # different for documentation;
|   |   ├── jade:pages:docs         # build all the page HTML;
|   |   ├── jade:pages:index:docs   # build the index file for the documentation app;
|   |   └── jade:modules            # build all the module HTML;
├── browsersync
├── watch:docs
└── open:docs
```
