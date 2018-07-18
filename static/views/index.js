'use strict';
var angular = require('angular');

function views() {
    return {
        etprInfo: require('ngtemplate-loader?relativeTo=' + __dirname + '!html-loader!./etprInfo/etprInfo.html'),
        consDet: require('ngtemplate-loader?relativeTo=' + __dirname + '!html-loader!./etprInfo/consDet.html')
        // etprInfo: require('./etprInfo/etprInfo.html'),
        // consDet: require('./etprInfo/consDet.html')
    };
}

exports = module.exports = views();

var viewsModule = angular.module('app.views', [])
    .constant(views.name, exports);

exports.default = viewsModule.name;