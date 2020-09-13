<template>
  <div class="idc-list">
  <el-table
    :data="value"
    style="width: 100%">
    <el-table-column
      label="ID"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="名称"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="电话"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.phone }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="邮箱"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.email }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="地址"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.address }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="简称"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.letter }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  name: 'idc-list',
  props: ['value'],
  methods: {
    handleEdit(value) {
      this.$emit('edit', value)
    },
    handleDelete(idc) {
      const id = idc.id
      const name = idc.name
      this.$confirm(`此操作将删除该条IDC: ${name}, 是否继续?`, '提示', {
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
.idc-list {}
</style>
