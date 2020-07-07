//表示依赖了全局的Vue
(function (Vue) {
	const items = [
		// {
		// 	id: 1, //主键id
		// 	content: "vue.js", //输入的内容
		// 	complated: false, //是否完成
		// },
		// {
		// 	id: 2, //主键id
		// 	content: "java", //输入的内容
		// 	complated: false, //是否完成
		// },
		// {
		// 	id: 3, //主键id
		// 	content: "python", //输入的内容
		// 	complated: true, //是否完成
		// },
	];
	//自定义全局指令，用于 增加输入框
	//定义时不要在前面加v-，引用指令是要加上v-
	Vue.directive("app-focus", {
		//聚集元素
		inserted(el, binding) {
			el.focus();
		},
	});
	new Vue({
		el: "#todoapp",
		data: {
			items, //这是对象属性的简写方式，等价于items:items(key-value名称一样时使用)
			currentItem: null, //接受当前点击的任务项
		},
		//自定义局部指令，用于编辑输入框
		directives: {
			"todo-focus": {
				//每当指令的值更新后，会调动此函数
				update(el, binding) {
					if (binding.value) {
						el.focus();
					}
				},
			},
		},
		computed: {
			//过滤出所有未完成的任务项
			remaining() {
				//ES6 箭头函数
				return this.items.filter((item) => !item.completed).length;
			},
			toggleAll: {
				get() {
					// console.log("toggleAll--get:", this.remaining);
					//2.当 this.remaining 发生变化后，会触发该方法运行
					//当所有未完成任务为 0 ，表示全部完成，这返回 true 让复选框选中
					//反之 false 不选中
					return this.remaining === 0;
				},
				set(newStatus) {
					// console.log("toggleAll--set:", newStatus);
					//1.当点击 checkbox 复选框后状态变化后，就会触发该方法运行，
					//迭代出数组的每个元素，把当前状态值赋给每个元素的 completed
					this.items.filter((item) => {
						item.completed = newStatus;
					});
				},
			},
		},
		methods: {
			finishEdit(item, index, event) {
				const content = event.target.value.trim();
				//1.如果数据为空，则进行删除任务项
				if (!content) {
					this.removeItem(index);
					return;
				}
				//2.添加数据到任务项中
				item.content = content;
				//3.移除 .editing样式
				this.currentItem = null;
			},
			//取消编辑
			cancelEdit() {
				//移除样式
				this.currentItem = null;
			},
			//进入编辑状态，当前点击的任务项item赋值currentItem,用于页面判断显示
			toEdit(item) {
				this.currentItem = item;
			},
			//移除所有未完成任务项
			removeCompleted() {
				// console.log("removeCompleted");
				//过滤出所有未完成的任务，重新赋值数组即可
				this.items = this.items.filter((item) => {
					!item.completed;
				});
			},
			//增加任务项
			removeItem(index) {
				//移除索引为 index 的一条记录
				this.items.splice(index, 1);
			},
			//增加任务项
			addItme(event) {
				//对象属性函数简写，等价于addItem:function(){};
				// console.log("addItem", event.target.value);F
				//1.获取文本框输入的数据
				const content = event.target.value.trim();
				//2.判断数据如果为空，则什么都不做
				if (!content.length) {
					return;
				}
				//3.如果不为空，则添加到数组中
				//生成id值
				const id = this.items.length + 1;
				this.items.push({ id, content, completed: false });
				//4.清空文本框内容
				event.target.value = "";
			},
		},
	});
	// Your starting point. Enjoy the ride!
})(Vue);
