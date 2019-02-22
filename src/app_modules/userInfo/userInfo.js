(() => {
  let injects = [
    "$ionicLoading",
  ];
  app.controller("userInfoCtrl", [
    ...injects,
    class userInfoCtrl {
      constructor(...args) {
        console.log(args);
        console.log("用户信息");
        this.title = "大家好呀";
        console.log(this.title);
      }
    }
  ])
})();


/**
 * 这种写法无法使用数据绑定到controller上，绑定到controller上的这种思想本来就是angular2的
 * 1.5是angularjs到angular2过渡版本所以这种方法不成立
 */
