<template>
  <div>
    <!-- :inline="true" 行内表单 -->
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchMap"
      class="demo-form-inline"
      style="margin-top:20px"
    >
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="searchMap.code" placeholder="商品编号"></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <!-- el-input  是组件，要在组件元素监听原生事件，需要使用v-on:原生事件名.native="处理函数" -->
        <el-input
          v-model="searchMap.supplierName"
          placeholder="选择供应商"
          readonly
          @click.native="dialogSupplierVisible = true"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData">
          查询
        </el-button>
        <el-button
          icon="el-icon-remove-outline"
          @click="resetForm('searchForm')"
        >
          重置
        </el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="handleAddGoods"
        >
          新增
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 数据列表
        :data  绑定渲染的数据
        border 表格边框
     -->
    <el-table :data="list" height="380" border style="width: 100%">
      <!-- type="index" 获取索引值,从1开始,label显示标题 -->
      <el-table-column type="index" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="name" label="商品名称" align="center">
      </el-table-column>
      <el-table-column prop="code" label="商品编码" align="center">
      </el-table-column>
      <el-table-column prop="spec" label="商品规格" align="center">
      </el-table-column>
      <el-table-column prop="retailPrice" label="零售价" align="center">
      </el-table-column>
      <el-table-column prop="purchasePrice" label="进货价" align="center">
      </el-table-column>
      <el-table-column prop="storageNum" label="库存数量" align="center">
      </el-table-column>
      <el-table-column prop="supplierName" label="供应商" align="center">
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 对话框表单 -->
    <el-dialog title="编辑商品" :visible.sync="dialogFormVisible" width="500">
      <!-- status-icon  当表单效验不通过时，输入框右侧有个x小图标 -->
      <el-form
        status-icon
        ref="pojoForm"
        :model="pojo"
        :rules="rules"
        label-width="100px"
        label-position="right"
        style="width:400px"
      >
        <!-- 
          添加一个隐藏的id值,每次打开编辑窗口会先被清空,
          如果是新增操作id则为null,如果是更新操作id则会被查询出来的商品ID覆盖(就不为null),
          用于编辑商品信息的时候来标识当前属于哪种窗口
        -->
        <el-form-item label="商品ID" prop="id" v-show="false"> </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="pojo.name"></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="code">
          <el-input v-model="pojo.code"></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="spec">
          <el-input v-model="pojo.spec"></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="retailPrice">
          <el-input v-model="pojo.retailPrice"></el-input>
        </el-form-item>
        <el-form-item label="进货价" prop="purchasePrice">
          <el-input v-model="pojo.purchasePrice"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="storageNum">
          <el-input v-model="pojo.storageNum"></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplierName">
          <el-input
            readonly
            v-model="pojo.supplierName"
            placeholder="选择供应商"
            @click.native="editOptionSupplier"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            pojo.id === null ? addGoods('pojoForm') : updateGoods('pojoForm')
          "
        >
          确 定
        </el-button>
      </div>
    </el-dialog>

    <!-- 选择商品对话框 -->
    <el-dialog
      title="选择供应商"
      :visible.sync="dialogSupplierVisible"
      width="500px"
    >
      <supplier
        @option-supplier="optionSupplier"
        :isDialog="isDialog"
      ></supplier>
    </el-dialog>
  </div>
</template>

<script>
import goodsApi from "@/api/goods";
import Supplier from "@/views/supplier";
export default {
  //注册 Supplier 作为子组件
  components: {
    Supplier
  },
  data() {
    return {
      list: [], //商品列表
      pageSize: 10,
      currentPage: 1,
      total: 0,
      searchMap: {
        name: "",
        code: "",
        supplierId: "",
        supplierName: ""
      }, //搜索条件
      dialogSupplierVisible: false, //控制供应商对话框
      isDialog: true, //控制选择供应商中的一部分Dom不渲染
      dialogFormVisible: false, //编辑窗口
      pojo: {
        id: null,
        name: "",
        code: "",
        spec: "",
        retailPrice: 0,
        purchasePrice: 0,
        storageNum: 0,
        supplierName: ""
      }, //商品实体
      rules: {
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" }
        ],
        code: [
          { required: true, message: "商品编码不能为空", trigger: "blur" }
        ],
        retailPrice: [
          { required: true, message: "零售价不能为空", trigger: "blur" }
        ]
      }, //表单效验规则
      isEdit: false //是否为变价编辑窗口
    };
  },
  //获取到data中的数据后，模板渲染前 ，进行抓取数据
  created() {
    this.fetchData();
  },
  methods: {
    //抓取数据
    fetchData() {
      goodsApi
        .getGoodsList(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          const res = response.data;
          if (res.flag) {
            this.total = res.data.total;
            this.list = res.data.rows;
          }
        });
    },
    //重置行内表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //当每页显示条数改变后，被触发，val是最新的每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    //当页码改变后，被触发，val是最新的页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    //添加商品时 控制选择供应商窗口
    editOptionSupplier() {
      this.isEdit = true;
      this.dialogSupplierVisible = true;
    },
    //选择供应商后进行供应商名称回显
    optionSupplier(currentRow) {
      if (this.isEdit) {
        //是编辑窗口打开的选择供应商
        this.pojo.supplierName = currentRow.name;
        this.pojo.supplierId = currentRow.id;
      } else {
        //是搜索区域打开的选择供应商
        this.searchMap.supplierName = currentRow.name;
        this.searchMap.supplierId = currentRow.id;
      }
      this.isEdit = false; //还原编辑窗口的初始状态
      this.dialogSupplierVisible = false;
    },
    //新增商品数据
    handleAddGoods() {
      this.dialogFormVisible = true;
      /*
        this.$nextTick() 是一个异步事件，当Dom全部渲染结束之后，它的回调函数才会被执行
         弹出窗口打开之后，需要加载Dom，就需要花费一点时间，我们就应该等待它加载完dom之后，
         再进行调用resetFields，重置表单和清除样式，如果在不使用$nextTick的情况下，
         使用表单中的方法就会报错，因为在dom渲染过程中这些方法还没有定义出来
      */
      this.$nextTick(() => {
        this.$refs["pojoForm"].resetFields();
      });
    },
    //新增商品数据
    addGoods(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证通过，提交添加
          goodsApi.addGoods(this.pojo).then(response => {
            const res = response.data;
            this.$message({
              message: res.message,
              type: res.flag ? "success" : "warning"
            });
            if (res.flag) {
              //新增成功，刷新列表数据
              this.fetchData();
              this.dialogFormVisible = false;
            }
          });
        } else {
          //验证不通过
          return false;
        }
      });
    },
    //根据Id编辑商品
    handleEdit(id) {
      this.handleAddGoods();
      goodsApi.getGoodsById(id).then(response => {
        const res = response.data;
        if (res.flag) {
          this.pojo = res.data;
        } else {
          this.$message({
            message: res.message,
            type: "warning"
          });
        }
      });
    },
    //更新商品信息
    updateGoods(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          goodsApi.updateGoods(this.pojo).then(response => {
            const res = response.data;
            this.$message({
              message: res.message,
              type: res.flag ? "success" : "warning"
            });
            if (res.flag) {
              //更新成功，刷新列表数据
              this.fetchData();
              this.dialogFormVisible = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    //根据Id删除商品
    handleDelete(id) {
      this.$confirm("是否删除该商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //确认
          goodsApi.deleteGoods(id).then(response => {
            const res = response.data;
            this.$message({
              type: res.flag ? "success" : "wraning",
              message: res.message
            });
            if (res.flag) {
              //删除成功，刷新列表数据

              this.fetchData();
            }
          });
        })
        .catch(() => {
          //取消
        });
    }
  }
};
</script>

<style scoped lang="scss"></style>
