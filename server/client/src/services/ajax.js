
function ajax($http) {

  const service = {
    get:  get,
    post: post,
    put:  put,
    del:  del
  };

  return service;

  function get (resorce , id) {
    if (id) {
      return $http.get(`${resorce}/${id}`);
    }        
    return $http.get(resorce);
  }

  function post (resorce, body) {
    return $http.post(resorce, body);
  }

  function put (resorce ,body) {
    return $http.put(resorce, body);
  }

  function del (resorce, id) {
    return $http.del(`${resorce}/${id}`);
  }
}

ajax.$inject = ['$http'];

module.exports = angular.module('app.ajax', [])
     .factory('ajax', ajax);

