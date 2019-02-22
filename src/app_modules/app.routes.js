app.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
    .state('userInfo', {
      cache: true,
      url: '/userInfo',
      templateUrl: 'app_modules/userInfo/userInfo.html',
      controller: 'userInfoCtrl'
    })
    .state('test', {
      cache: true,
      url: '/test',
      template: '<ui-test></ui-test>'
    })
  $urlRouterProvider.otherwise('/test');
})
