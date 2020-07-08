(function () {
  const template = `<!--体育栏目-->
                    <div>
                        <ul>
                            <li v-for="(sport,index) in sportArr" :key="sport.id">
                            <!-- 注意：to中是JS表达式，就需要使用v-bind绑定to属性，即:to -->
                            <router-link :to="'/news/sport/detail/'+sport.id">
                                {{sport.title}}
                            </router-link>
                            </li>
                        </ul>
                        <!--详情  渲染出sportDetail内容-->
                        <router-view></router-view>
                    </div>  `;
  window.Sport = {
    template,
    data() {
      return {
        sportArr: [],
      };
    },
    created() {
      this.getSportArr();
    },
    methods: {
      getSportArr() {
        axios
          .get(
            "http://127.0.0.1:5500/vue-08-router/02-bootstrap-ajax-router/db/sport.json"
          )
          .then((response) => {
            console.log(response, this);
            this.sportArr = response.data;
          })
          .catch((error) => {
            console.log(error.message);
          });
      },
    },
  };
})();
