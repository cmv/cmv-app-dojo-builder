define([
  'dojo/_base/declare',

  // minimal Base Controller
  'viewer/_ControllerBase',

  // *** Controller Mixins
  // Use the core mixins, add custom mixins
  // or replace core mixins with your own
  './_ConfigMixin', // manage the Configuration
  'viewer/_LayoutMixin', // build and manage the Page Layout and User Interface
  'viewer/_MapMixin', // build and manage the Map
  'viewer/_WidgetsMixin', // build and manage the Widgets

  //include our apps css
  'xstyle/css!./css/main.css'
], function(
  declare,
  _ControllerBase,
  _ConfigMixin,
  _LayoutMixin,
  _MapMixin,
  _WidgetsMixin
  //_MyCustomMixin
) {
  return declare([
    _ConfigMixin,
    _LayoutMixin,
    _MapMixin,
    _WidgetsMixin,
    _ControllerBase
  ]);
});
