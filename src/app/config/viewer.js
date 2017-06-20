define([
    'esri/units',
    'esri/geometry/Extent',
    'esri/config',
    /*'esri/urlUtils',*/
    'esri/tasks/GeometryService',
    'esri/layers/ImageParameters',
    'dojo/i18n!cmv/viewer/js/config/nls/main',
    'gis/plugins/Google',
    'dojo/topic',

    // many modules are require'd on demand by the controller, so
    // if we want them included in our dojo build, we specify them here so
    // they are recognized and included

    // configs
    'app/config/bookmarks',
    'app/config/find',
    'app/config/identify',
    'app/config/basemaps',

    //layers and layer controllers
    'esri/layers/FeatureLayer',
    'esri/layers/ArcGISDynamicMapServiceLayer'

], function (units, Extent, esriConfig, /*urlUtils,*/ GeometryService, ImageParameters, i18n, GoogleMapsLoader, topic) {

    // url to your proxy page, must be on same machine hosting you app. See proxy folder for readme.
    esriConfig.defaults.io.proxyUrl = 'proxy/proxy.ashx';
    esriConfig.defaults.io.alwaysUseProxy = false;

    // add a proxy rule to force specific domain requests through proxy
    // be sure the domain is added in proxy.config
    /*urlUtils.addProxyRule({
        urlPrefix: 'www.example.com',
        proxyUrl: 'proxy/proxy.ashx'
    });*/

    // url to your geometry server.
    esriConfig.defaults.geometryService = new GeometryService('https://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer');

    // Use your own Google Maps API Key.
    // https://developers.google.com/maps/documentation/javascript/get-api-key
    GoogleMapsLoader.KEY = 'NOT-A-REAL-API-KEY';

    // helper function returning ImageParameters for dynamic layers
    // example:
    // imageParameters: buildImageParameters({
    //     layerIds: [0],
    //     layerOption: 'show'
    // })
    function buildImageParameters (config) {
        config = config || {};
        var ip = new ImageParameters();
        //image parameters for dynamic services, set to png32 for higher quality exports
        ip.format = 'png32';
        for (var key in config) {
            if (config.hasOwnProperty(key)) {
                ip[key] = config[key];
            }
        }
        return ip;
    }

    //some example topics for listening to menu item clicks
    //these topics publish a simple message to the growler
    //in a real world example, these topics would be used
    //in their own widget to listen for layer menu click events
    topic.subscribe('layerControl/hello', function (event) {
        topic.publish('growler/growl', {
            title: 'Hello!',
            message: event.layer._titleForLegend + ' ' +
                (event.subLayer ? event.subLayer.name : '') +
                ' says hello'
        });
    });
    topic.subscribe('layerControl/goodbye', function (event) {
        topic.publish('growler/growl', {
            title: 'Goodbye!',
            message: event.layer._titleForLegend + ' ' +
                (event.subLayer ? event.subLayer.name : '') +
                ' says goodbye'
        });
    });

    return {
        // used for debugging your app
        isDebug: true,

        //default mapClick mode, mapClickMode lets widgets know what mode the map is in to avoid multipult map click actions from taking place (ie identify while drawing).
        defaultMapClickMode: 'identify',
        // map options, passed to map constructor. see: https://developers.arcgis.com/javascript/jsapi/map-amd.html#map1
        mapOptions: {
            basemap: 'streets',
            center: [-96.59179687497497, 39.09596293629694],
            zoom: 5,
            sliderStyle: 'small'
        },

        //webMapId: 'ef9c7fbda731474d98647bebb4b33c20',  // High Cost Mortgage
        // webMapOptions: {},

        // panes: {
        // 	left: {
        // 		splitter: true
        // 	},
        // 	right: {
        // 		id: 'sidebarRight',
        // 		placeAt: 'outer',
        // 		region: 'right',
        // 		splitter: true,
        // 		collapsible: true
        // 	},
        // 	bottom: {
        // 		id: 'sidebarBottom',
        // 		placeAt: 'outer',
        // 		splitter: true,
        // 		collapsible: true,
        // 		region: 'bottom'
        // 	},
        // 	top: {
        // 		id: 'sidebarTop',
        // 		placeAt: 'outer',
        // 		collapsible: true,
        // 		splitter: true,
        // 		region: 'top'
        // 	}
        // },
        // collapseButtonsPane: 'center', //center or outer

        // custom titles
        titles: {
            header: i18n.viewer.titles.header,
            subHeader: i18n.viewer.titles.subHeader,
            pageTitle: i18n.viewer.titles.pageTitle
        },

        // user-defined layer types
        /*
        layerTypes: {
            myCustomLayer: 'widgets/MyCustomLayer'
        },
        */

        // user-defined widget types
        /*
        widgetTypes: [
            'myWidgetType'
        ],
        */

        // operationalLayers: Array of Layers to load on top of the basemap: valid 'type' options: 'dynamic', 'tiled', 'feature'.
        // The 'options' object is passed as the layers options for constructor. Title will be used in the legend only. id's must be unique and have no spaces.
        // 3 'mode' options: MODE_SNAPSHOT = 0, MODE_ONDEMAND = 1, MODE_SELECTION = 2
        operationalLayers: [{
            type: 'feature',
            url: 'https://services1.arcgis.com/6bXbLtkf4y11TosO/arcgis/rest/services/Restaurants/FeatureServer/0',
            title: i18n.viewer.operationalLayers.restaurants,
            options: {
                id: 'restaurants',
                opacity: 1.0,
                visible: true,
                outFields: ['*'],
                mode: 0
            },
            editorLayerInfos: {
                disableGeometryUpdate: false
            },
            legendLayerInfos: {
                exclude: false,
                layerInfo: {
                    title: i18n.viewer.operationalLayers.restaurants
                }
            }
        }, {
            type: 'feature',
            url: 'https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/SanFrancisco/311Incidents/FeatureServer/0',
            title: i18n.viewer.operationalLayers.sf311Incidents,
            options: {
                id: 'sf311Incidents',
                opacity: 1.0,
                visible: true,
                outFields: ['req_type', 'req_date', 'req_time', 'address', 'district'],
                mode: 0
            },
            layerControlLayerInfos: {
                menu: [{
                    topic: 'hello',
                    label: 'Say Hello Custom',
                    iconClass: 'fa fa-smile-o'
                }]
            }
        }, {
            type: 'dynamic',
            url: 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/PublicSafety/PublicSafetyOperationalLayers/MapServer',
            title: i18n.viewer.operationalLayers.louisvillePubSafety,
            options: {
                id: 'louisvillePubSafety',
                opacity: 1.0,
                visible: true,
                imageParameters: buildImageParameters({
                    layerIds: [0, 2, 4, 5, 8, 10, 12, 21],
                    layerOption: 'show'
                })
            },
            identifyLayerInfos: {
                layerIds: [2, 4, 5, 8, 12, 21]
            },
            layerControlLayerInfos: {
                layerIds: [0, 2, 4, 5, 8, 9, 10, 12, 21]
            },
            legendLayerInfos: {
                layerInfo: {
                    hideLayers: [21]
                }
            }
        }, {
            type: 'dynamic',
            url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/DamageAssessment/MapServer',
            title: i18n.viewer.operationalLayers.damageAssessment,
            options: {
                id: 'damageAssessment',
                opacity: 1.0,
                visible: true,
                imageParameters: buildImageParameters()
            },
            legendLayerInfos: {
                exclude: true
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: true,

                //override the menu on this particular layer
                subLayerMenu: [{
                    topic: 'hello',
                    label: 'Say Hello',
                    iconClass: 'fa fa-smile-o'
                }]
            }
            /*
            //examples of vector tile layers (beta in v3.15)
            }, {
                type: 'vectortile',
                title: 'Light Gray Canvas Vector',
                url: 'https//www.arcgis.com/sharing/rest/content/items/bdf1eec3fa79456c8c7c2bb62f86dade/resources/styles/root.json',
                options: {
                    id: 'vectortile1',
                    opacity: 0.8,
                    visible: true
                }
            }, {
               //  taken from this demo: https://github.com/ycabon/presentations/blob/gh-pages/2015-berlin-plenary/demos/3.15-vectortile/create-by-style-object.html
                type: 'vectortile',
                title: 'Custom Vector Style',
                options: {
                    id: 'vectortile2',
                    opacity: 1.0,
                    visible: true,
                    'glyphs': 'https://www.arcgis.com/sharing/rest/content/items/00cd8e843bae49b3a040423e5d65416b/resources/fonts/{fontstack}/{range}.pbf',
                    'sprite': 'https://www.arcgis.com/sharing/rest/content/items/00cd8e843bae49b3a040423e5d65416b/resources/sprites/sprite',
                    'version': 8,
                    'sources': {
                        'esri': {
                            'url': 'https://basemapsdev.arcgis.com/arcgis/rest/services/World_Basemap/VectorTileServer',
                            'type': 'vector'
                        }
                    },
                    'layers': [{
                        'id': 'background',
                        'type': 'background',
                        'paint': {
                            'background-color': '#556688'
                        }
                    }, {
                        'id': 'Land',
                        'type': 'fill',
                        'source': 'esri',
                        'source-layer': 'Land',
                        'paint': {
                            'fill-color': '#273344'
                        },
                    }, {
                        'id': 'roads',
                        'type': 'line',
                        'source': 'esri',
                        'source-layer': 'Road',
                        'layout': {
                            'line-join': 'round'
                        },
                        'paint': {
                            'line-width': 1,
                            'line-color': '#131622'
                        }
                    }]
                }
            */
        }],
        // set include:true to load. For titlePane type set position the the desired order in the sidebar
        widgets: {
            layerControl: {
                include: true,
                id: 'layerControl',
                type: 'titlePane',
                path: 'gis/dijit/LayerControl',
                title: i18n.viewer.widgets.layerControl,
                iconClass: 'fa-th-list',
                open: false,
                position: 0,
                options: {
                    map: true,
                    layerControlLayerInfos: true,
                    separated: true,
                    vectorReorder: true,
                    overlayReorder: true,
                    // create a custom menu entry in all of these feature types
                    // the custom menu item will publish a topic when clicked
                    menu: {
                        feature: [{
                            topic: 'hello',
                            iconClass: 'fa fa-smile-o',
                            label: 'Say Hello'
                        }]
                    },
                    //create a example sub layer menu that will
                    //apply to all layers of type 'dynamic'
                    subLayerMenu: {
                        dynamic: [{
                            topic: 'goodbye',
                            iconClass: 'fa fa-frown-o',
                            label: 'Say goodbye'
                        }]
                    }
                }
            }
        }
    };
});
