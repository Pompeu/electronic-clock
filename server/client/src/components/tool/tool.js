const tool = {
  template: require('./tool.html')
}

module.exports = angular.module('app.tool', [])
  .component('eleToll', tool);
