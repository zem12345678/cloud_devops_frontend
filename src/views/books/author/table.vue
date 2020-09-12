<template>
  <div class="AuthorList">
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
        label="姓名"
        prop="name"
      />

      <el-table-column
        label="Email"
        prop="email"
      />

      <el-table-column
        label="手机"
        prop="phone"
      />

      <el-table-column
        label="地址"
        prop="address"
      />

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
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
  name: 'AuthorList',
  props: ['value'],
  methods: {
    /* 点击编辑按钮，将子组件的事件传递给父组件 */
    handleEdit(value) {
      this.$emit('edit', value)
    },

    /* 删除 */
    handleDelete(author) {
      const id = author.id
      const name = author.name
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
.AuthorList {}
</style>

