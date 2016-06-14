require('angular-material/angular-material.min.css');
require('./css/style.css');

const angular    = require('angular');
const ngMaterial = require('angular-material');

const appInjector = [
  require('./services/ajax'),
  require('./components/tool/tool'),
  require('./components/menu/menu'),
  require('./components/menu/login')
]
  .map(modules => modules.name)
  .concat([ngMaterial])

module.exports = angular.module('app', appInjector);
