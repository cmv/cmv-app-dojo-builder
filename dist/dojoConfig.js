var dojoConfig = {
    // Enable the AMD loader
    async: true,
    // Define the base URL for all of our modules and packages
    baseUrl: '.',
    //this can be changed to force a reload of all files for end user's browser
    cacheBust: '1.3.3',
    map: {
        '*': {
            'viewer': 'cmv/viewer/js/viewer',
            'gis': 'cmv/viewer/js/gis',
            'proj4js': 'app/vendor'
        }
    },
    packages: [{
        name: 'cmv',
        location: 'cmv'
    }, {
        name: 'dgrid',
        location: 'dgrid'
    }, {
        name: 'dgrid1',
        location: 'dgrid1'
    }, {
        name: 'dijit',
        location: 'dijit'
    }, {
        name: 'dojo',
        location: 'dojo'
    }, {
        name: 'dojox',
        location: 'dojox'
    }, {
        name: 'put-selector',
        location: 'put-selector',
        main: 'put'
    }, {
        name: 'xstyle',
        location: 'xstyle'
    }, {
        name: 'esri',
        location: 'esri'
    }, {
        name: 'moment',
        location: 'moment'
    }, {
        name: 'dstore',
        location: 'dstore'
    }, {
        name: 'app',
        location: 'app'
    }, {
        name: 'flag-icon-css',
        location: 'flag-icon-css'
    }],
    // Use the smaller, faster "lite" CSS selector engine, which works in all browsers IE8+
    selectorEngine: 'lite',
    // Fix the loader to use normal AMD resolution of unregistered module paths (relative to `baseUrl`)
    // instead of the legacy Dojo resolution method (relative to the parent directory of `baseUrl`)
    tlmSiblingOfDojo: false
};
