//表示依赖了全局的Vue
(function (Vue) {
	var STORAGE_KEY = "items-vuejs";
	//本地存储数据对象
	const itemStorage = {
		//获取本地数据
		fetch: function () {
			return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
		},
		//保存数据到本地
		save: function (items) {
			// console.log("items", items);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		},
	};
	//初始化任务
	const items = [];
	//自定义全局指令，用于 增加输入框
	//定义时不要在前面加v-，引用指令是要加上v-
	Vue.directive("app-focus", {
		//聚集元素
		inserted(el, binding) {
			el.focus();
		},
	});
	var app = new Vue({
		el: "#todoapp",
		data: {
			items: itemStorage.fetch(), //这是对象属性的简写方式，等价于items:items(key-value名称一样时使用)
			currentItem: null, //接受当前点击的任务项
			filterStatus: "all", //接受变化的状态值
		},
		watch: {
			//如果 items 发生改变，这个函数就会执行
			items: {
				deep: true, //发现对象内部值的变化，要在选项参数中指定deep:true.
				handler: function (newItems, oldItems) {
					//本地进行存储
					// console.log("items--handler");
					itemStorage.save(newItems);
				},
			},
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
			//过滤出不同状态数据
			filterItems() {
				//this.filterStatus作为条件，变化后过滤不同数据
				switch (this.filterStatus) {
					//过滤出未完成的数据
					case "active":
						// console.log("active");
						return this.items.filter((item) => !item.completed);
						break;
					//过滤出已完成的数据
					case "completed":
						// console.log("completed");
						return this.items.filter((item) => item.completed);
						break;
					//其他返回所有数据
					default:
						return this.items;
				}
			},
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
				//过滤出所有未完成的任务，重新赋值数组即可
				this.items = this.items.filter((item) => !item.completed);
				// console.log("removeCompleted", items);
			},
			//移除任务项
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
	//当hash值改变后会自动调用此函数
	window.onhashchange = function () {
		// console.log("hash改变了", window.location.hash);
		//获取点击的路由 hash ,当截取的 hash 不为空 返回截取的，为空时返回 “all”
		const hash = window.location.hash.substr(2) || "all";
		// console.log("hash", hash);
		//2.状态一旦改变，将 hash 赋值给 filterStatus
		// 当计算属性 filterItems 感知到 filterStatus 变化后，就会重新过滤
		// 当filterItems 重新过滤出目标数据后，则自动同步更新到视图中
		app.filterStatus = hash;
	};
	//第一次访问页面时，调用一次让状态生效
	window.onhashchange();
})(Vue);
