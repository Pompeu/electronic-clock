const menu = {
  template: require('./menu.html'),
  controller: MenuController,
  controllerAs: 'menu'
}

function MenuController (Modal) {
  const menu = this;
  menu.desserts = [
    'Login',
    'SignIN'
  ];

  menu.open = (ev, dessert) => {
    Modal.showDialog(ev, dessert);
  }
}

MenuController.$inject = ['Modal'];

module.exports = angular.module('app.menu', [])
  .component('eleMenu', menu);
