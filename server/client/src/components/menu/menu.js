const menu = {
  template: require('./menu.html'),
  controller: MenuController,
  controllerAs: 'menu'
}

function MenuController (LoginDialog) {
  const menu = this;
  menu.desserts = [
    'Login',
    'SingUp'
  ];

  menu.open = ev => {
    LoginDialog.showDialog(ev);
  }
}

MenuController.$inject = ['LoginDialog'];

module.exports = angular.module('app.menu', [])
  .component('eleMenu', menu);
