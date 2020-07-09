(function () {
  const template = `<!--详情-->
                    <div class="jumbotron">
                        <h2>{{techDetail.title}}</h2>
                        <p>{{techDetail.content}}</p>
                    </div>`;
  window.TechDetail = {
    template,
    //data只会初始化一次，后面点击后不会再重新赋值了
    data() {
      return {
        id: null,
        techDetail: {},
      };
    },
    created() {
      //第一次初始化组件时，要调用函数进行获取id并查找数据
      this.getTechById();
    },
    methods: {
      getTechById() {
        //1.获取路由地址中的id值
        this.id = this.$route.params.id - 0;
        //2.获取所有的体育新闻
        axios
          .get(
            "http://127.0.0.1:5500/vue-08-router/02-bootstrap-ajax-router/db/tech.json"
          )
          .then((response) => {
            console.log(response, this);
            const techArr = response.data;
            //3.通过id获取指定的新闻
            //find 返回满足条件的 1 条数据
            this.techDetail = techArr.find((detail) => {
              //this 如果要代表当前组件对象 ，则 回调函数要使用箭头函数
              return detail.id === this.id;
            });
          })
          .catch((error) => {
            console.log(error.message);
          });
      },
    },
    //watch是对象，用来监听属性使用
    watch: {
      $route: function () {
        this.getTechById();
        console.log("$route改变了", this.id);
      },
    },
  };
})();
