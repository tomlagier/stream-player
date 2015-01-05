/* globals require */

require.config({
  shim: {
    'socketio': {
      exports: 'io'
    },
    'underscore': {
      exports: '_'
    },
    'backbone-original': {
      deps: [
        'underscore',
        'jquery',
      ],
      exports: 'Backbone'
    },
    'backbone': {
      deps: ['backbone-original'],
    },
    'marionette': {
      deps: [
        'backbone'
      ],
      exports: 'Marionette'
    }
  },
  paths: {
    jquery: 'https://code.jquery.com/jquery-2.1.3.js',
    socketio: 'https://cdn.socket.io/socket.io-1.2.1.js',
    underscore: '../libs/underscore',
    marionette: '../libs/marionette',
    'backbone-original': '../libs/backbone',
    backbone: '../libs/backbone-localstorage',
    templates: '../templates',
    utilities: 'Utilities',
    models: 'models',
    controllers: 'controllers',
    collections: 'collections',
    views: 'views',
  }
});

require([
  'ChatApp'
], function (ChatApp) {
  'use strict';

  ChatApp.start();
});