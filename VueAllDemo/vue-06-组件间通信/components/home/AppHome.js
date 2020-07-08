(function () {
  const template = `<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                        <!--右边上半区域-->
                        <h1 class="page-header">Dashboard</h1>
                        <dashboard :hobbies="hobbies"></dashboard>
                        <!--右边下半区域-->
                        <h2 class="sub-header">Section title</h2>
                        <home-list :emp-list="empList"></home-list>
                    </div>`;
  window.AppHome = {
    template,
    components: {
      //Dashboard 作为 AppHome 的子组件
      Dashboard,
      HomeList,
    },
    data() {
      return {
        hobbies: ["健身", "学英语", "拳击", "学编程"],
        empList: [
          { id: 1, name: "gerry1", salary: 1000 },
          { id: 2, name: "gerry2", salary: 2000 },
          { id: 3, name: "gerry3", salary: 3000 },
          { id: 4, name: "gerry4", salary: 4000 },
        ],
      };
    },
  };
})();
