//表示依赖了全局的Vue
(function (Vue) {
	const items = [
		{
			id: 1, //主键id
			content: "vue.js", //输入的内容
			complated: false, //是否完成
		},
		{
			id: 2, //主键id
			content: "java", //输入的内容
			complated: false, //是否完成
		},
		{
			id: 3, //主键id
			content: "python", //输入的内容
			complated: true, //是否完成
		},
	];
	new Vue({
		el: "#todoapp",
		data: {
			items, //这是对象属性的简写方式，等价于items:items(key-value名称一样时使用)
		},
	});
	// Your starting point. Enjoy the ride!
})(Vue);
