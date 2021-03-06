/* jshint node:true */

/**
 * Defines UserCollection for displaying a list of users.
 * @return Backbone.Collection UserCollection
 */

var Backbone = require('backbone-shim').Backbone,
  User = require('models/user/User');

module.exports = (function () {

  'use strict';

  return Backbone.Collection.extend({
    model: User,
  });
})();