app.component('uiTest', {
  bindings: {

  },
  templateUrl: "app_modules/uiTest/uiTest.component.html",
  controller: class uiTestCtrl {
    constructor() {
      this.title = "O(∩_∩)O哈哈~";
      console.log(this.title);
      this.items = ['one', 'two', 'three'];
    }

    $onInit() {}

    finishFunc() {
      console.log("加载完成");
      Sortable.create(document.getElementById('content'), {
        group: 'photo',
        animation: 150
      });
    }
  }
})
