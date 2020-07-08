(function () {
  window.AppLeaf = {
    template: `<div class="col-sm-3 col-md-2 sidebar">
                <ul class="nav nav-sidebar">
                    <!-- 
                        router-link 默认渲染出来的是a标签，
                        如果需要让他渲染出来的是别的标签，则可以使用tag属性指定渲染后的标签

                        2.可以在每个 router-link 上使用 active-class 来激活 CSS 类名
                        或者在VueRouter实例中，使用linkActiveClass 全局配置CSS类名
                    -->
                    <router-link to="/" tag="li" exact>
                        <a>首页</a>
                    </router-link>
                    <router-link to="/news" tag="li" >
                        <a>新闻管理</a>
                    </router-link>
                    <router-link to="/about" tag="li" >
                        <a>关于我们</a>
                    </router-link>
                </ul>
            </div>`,
  };
})();
