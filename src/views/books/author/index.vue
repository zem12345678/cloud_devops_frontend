<template>
  <div class="author">
    <div>
      <!--搜索-->
      <el-col :span="8">
        <el-input v-model="params.search" placeholder="搜索" @keyup.enter.native="searchClick">
          <el-button slot="append" icon="el-icon-search" @click="searchClick" />
        </el-input>
      </el-col>

      <!--添加按钮-->
      <el-col :span="16" style="text-align: right">
        <el-button type="primary" @click="handleAddBtn">添加作者</el-button>
      </el-col>
    </div>

    <!--表格-->
    <author-list :value="authors" @edit="handleEdit" @delete="handleDelete" />

    <!--模态窗增加表单-->
    <el-dialog
      title="添加"
      :visible.sync="dialogVisibleForAdd"
      width="50%"
    >
      <author-form
        ref="authorForm"
        @submit="handleSubmitAdd"
        @cancel="handleCancelAdd"
      />
    </el-dialog>

    <!--模态窗更新表单-->
    <el-dialog
      title="更新"
      :visible.sync="dialogVisibleForEdit"
      width="50%"
    >
      <author-form
        ref="authorForm"
        :form="currentValue"
        @submit="handleSubmitEdit"
        @cancel="handleCancelEdit"
      />
    </el-dialog>

    <!--分页-->
    <center>
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :page-size="pagesize"
        :total="totalNum"
        @current-change="handleCurrentChange"
      />
    </center>
  </div>
</template>

<script>
import { getAuthorList, createAuthor, updateAuthor, deleteAuthor } from '@/api/books/author'
import AuthorList from './table'
import AuthorForm from './form'

export default {
  name: 'Author',
  components: {
    AuthorList,
    AuthorForm
  },

  data() {
    return {
      dialogVisibleForAdd: false,
      dialogVisibleForEdit: false,
      currentValue: {},
      authors: [],
      totalNum: 0,
      pagesize: 2,
      params: {
        page: 1,
        search: ''
      }
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      getAuthorList(this.params).then(
        res => {
          this.authors = res.results
          this.totalNum = res.count
        })
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.fetchData()
      // console.log(this.params.page)
    },
    searchClick() {
      this.fetchData()
    },
    /* 添加组,弹出模态窗、提交数据、取消 */
    handleAddBtn() {
      this.dialogVisibleForAdd = true
    },
    handleSubmitAdd(value) {
      createAuthor(value).then(res => {
        this.$message({
          message: '创建组成功',
          type: 'success'
        })
        this.handleCancelAdd()
        this.fetchData()
      },
      err => {
        console.log(err.message)
      })
    },
    handleCancelAdd() {
      this.dialogVisibleForAdd = false
      this.$refs.authorForm.$refs.form.resetFields() // 清除掉子组件表单的数据
    },

    /* 更新，弹出模态窗、提交数据、取消 */
    handleEdit(value) {
      this.currentValue = { ...value } // 将子组件传来的值给父组件的变量，然后渲染表单
      this.dialogVisibleForEdit = true
    },

    handleSubmitEdit(value) {
      const { id, ...params } = value // 很神奇，能把表单的值拆解成自己想要的样子
      // console.log(id)
      // console.log(params)
      updateAuthor(id, params).then(res => {
        this.$message({
          message: '更新组成功',
          type: 'success'
        })
        this.handleCancelEdit()
        this.fetchData()
      })
    },
    handleCancelEdit() {
      this.dialogVisibleForEdit = false
      this.$refs.authorForm.$refs.form.resetFields()
    },

    /* 删除 */
    handleDelete(id) {
      deleteAuthor(id).then(res => {
        this.$message({
          message: '删除组成功',
          type: 'success'
        })
        this.params.page = 1
        this.fetchData()
      },
      err => {
        console.log(err.message)
      })
    }

  }

}
</script>

<style lang='scss' scoped>
.author {
  padding: 10px;
}
</style>

