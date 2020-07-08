(function () {
  const template = `<div class="table-responsive">
                        <table class="table table-striped">
                        <thead>
                            <tr>
                              <th>ID</th>
                              <th>姓名</th>
                              <th>工资</th>
                            </tr>
                        </thead>
                        <tbody>
                          <Item v-for="(emp,index) in empList" :key="emp.id" :emp="emp"/>
                        </tbody>
                        </table>
                    </div>`;

  window.HomeList = {
    //声明组件接受父组件传递的属性
    props: {
      empList: Array,
    },
    template,
    components: {
      Item,
    },
  };
})();
