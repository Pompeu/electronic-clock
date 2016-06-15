
const Modal = (LoginDialog, SigninDialog) => {
  const desserts = ['Login','SignIN'];
  const service = {
    showDialog
  };

  return service;

  function showDialog(ev, dessert) {
    switch (dessert) {
      case 'Login':
        return LoginDialog.showDialog(ev)
      case 'SignIN':
        return SigninDialog.showDialog(ev)
      default:
    }
  }
}

Modal.$inject = ['LoginDialog', 'SigninDialog'];

module.exports = angular.module('app.modal', [])
  .factory('Modal', Modal);
