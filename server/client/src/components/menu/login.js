
function loginDialog ($mdDialog) {
  const service = {
    showDialog
  };

  return service;

  function showDialog (ev) {
    return $mdDialog.show({
      controller: LoginController,
      template: require('./login.form.tmpl.html'),
      parent: angular.element(document.body),
      targetEvent: ev,
    });
  }

}
loginDialog.$inject = ['$mdDialog'];

function LoginController ($mdDialog) {
  const vm = this;
  vm.logar = (user) => {
    vm.tryLogin = true;
    setTimeout(() => {
      vm.tryLogin = false;
      vm.cancel();
    }, 2000);
  };

  vm.cancel = () => {
    $mdDialog.cancel();
  } 
}

LoginController.$inject = ['$mdDialog'];

module.exports = angular.module('app.login', [])
  .factory('LoginDialog', loginDialog)
  .controller('LoginController', LoginController);
