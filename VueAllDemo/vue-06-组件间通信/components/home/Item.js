(function () {
  const template = `<tr>
                        <td>{{emp.id}}</td>
                        <td>{{emp.name}}</td>
                        <td>{{emp.salary}}</td>
                    </tr>`;
  window.Item = {
    props: {
      //指定属性名/数据类型/时候必须
      emp: {
        type: Object,
        required: true,
      },
    },
    template,
  };
})();
