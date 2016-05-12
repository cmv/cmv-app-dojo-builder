# CMV - The Configurable Map Viewer

[![Read The Docs](https://img.shields.io/badge/docs-1.3.4-brightgreen.svg?style=flat)](http://docs.cmv.io/) [![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/cmv/cmv-app?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](http://travis-ci.org/cmv/cmv-app.svg?branch=master)](http://travis-ci.org/cmv/cmv-app)

## Introduction

[CMV](http://cmv.io/) is a community-supported open source mapping framework. CMV works with the [Esri JavaScript API](http://docs.cmv.io/en/latest/developers.arcgis.com/javascript/jsapi/), [ArcGIS Server](http://www.esri.com/software/arcgis/arcgisserver), [ArcGIS Online](https://arcgis.com/) and more.

## What is this branch?

This branch is the esri-jsapi resource directory setup for creating single file dojo
builds. It uses CMV as a bower resource and can be used to create high performance
dojo builds.

## Requirements
* [node & npm](https://nodejs.org/)
* [bower](http://bower.io/)
* [grunt](http://gruntjs.com/)
* [java 7 or greater](https://java.com/en/download/) - for [Closure Compiler](https://github.com/google/closure-compiler) used during build

## Usage
* `npm install -g bower` - installs bower
* `npm install -g grunt-cli` - installs global grunt
* `npm install` - installs required node and bower packages
* `npm run clean` - removes built files from `dist` directory
* `npm run build` - run the Dojo build on application
* `npm run build-dev` - run the Dojo build on application but leave all javascript files. Useful for debugging builds

If you have [Python](https://www.python.org/) you can run `python -m SimpleHTTPServer` in same folder as application to run it in a browser.

## Customizing dojo layers

1. Use `profiles/viewer.profile.js` to add your layers. One way to customize layers is to have one big one `dojo/dojo.js`.
2. Another option is to have one main layer `dojo/dojo.js` and several others like config files that are loaded on demand. This is the current setup in `profiles/viewer.profile.js`.

##Troubleshooting

Instead of running grunt `dojo-build`, instead try running `build-viewer.sh`. This will give you a detailed error log in the dist directory called `build-report.txt`. Errors begin with error(123) in the output. These errors will most likely be paths that do not resolve correctly.

## Resources

* [CMV](https://github.com/cmv/cmv-app)
* [The Dojo Build System](https://dojotoolkit.org/reference-guide/1.10/build/)
* [All about Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
* [Dojo Boilerplate](https://github.com/csnover/dojo-boilerplate)
