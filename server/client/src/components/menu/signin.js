
function signinDialog ($mdDialog) {
  const service = {
    showDialog
  };

  return service;

  function showDialog (ev) {
    return $mdDialog.show({
      controller: signinController,
      template: require('./signin.form.tmpl.html'),
      parent: angular.element(document.body),
      targetEvent: ev,
    });
  }

}

signinDialog.$inject = ['$mdDialog'];

function signinController ($mdDialog) {
  const vm = this;
  vm.sign = user => {
    vm.trysignin = true;
    setTimeout(() => {
      vm.trysignin = false;
      vm.cancel();
    }, 2000);
  };

  vm.cancel = () => {
    $mdDialog.cancel();
  } 
}

signinController.$inject = ['$mdDialog'];

module.exports = angular.module('app.signin', [])
  .factory('SigninDialog', signinDialog)
  .controller('SigninController', signinController);
