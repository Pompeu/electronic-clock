require('angular-material/angular-material.min.css');
require('./css/style.css');

const angular    = require('angular');
const ngMaterial = require('angular-material');

const appInjector = [
  require('./services/ajax'),
  require('./components/tool/tool'),
  require('./components/menu/menu'),
  require('./components/menu/login'),
  require('./components/menu/signin'),
  require('./components/menu/modal')
]
  .map(modules => modules.name)
  .concat([ngMaterial])

module.exports = angular.module('app', appInjector);
