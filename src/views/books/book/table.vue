<template>
  <div class="BookList">
    <el-table
      :data="value"
      border
      stripe
      style="width: 100%"
    >

      <el-table-column
        label="ID"
        prop="id"
        type="expand"
      />

      <el-table-column
        label="书名"
        prop="name"
      />

      <el-table-column
        label="作者"
        prop="author"
        type="scope"
      >
        <template slot-scope="scope">
          <div v-for="(item) in scope.row.authors">
            <span style="float: left">{{ item.name }}, </span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="出版社"
        prop="publisher"
        type="scope"
      >
        <template slot-scope="scope">
          {{ scope.row.publisher[0].name }}
        </template>
      </el-table-column>

      <el-table-column
        label="出版日期"
        prop="publication_date"
      />

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.row)"
          >编辑</el-button>

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  name: 'BookList',
  props: ['value'],
  methods: {
    /* 点击编辑按钮，将子组件的事件传递给父组件 */
    handleEdit(value) {
      this.$emit('edit', value)
    },

    /* 删除 */
    handleDelete(book) {
      const id = book.id
      const name = book.name
      this.$confirm(`此操作将删除: ${name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete', id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang='scss'>
.BookList {}
</style>

