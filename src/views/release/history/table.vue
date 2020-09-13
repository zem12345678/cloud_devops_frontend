<template>
  <div class="deploy-list">
  <el-table
    :data="value"
    border
    stripe
    style="width: 100%">

    <el-table-column
      label="项目名称"
      prop="name">
    </el-table-column>

    <el-table-column
      label="项目版本"
      prop="version">
    </el-table-column>

    <el-table-column
      label="版本描述"
      prop="info">
    </el-table-column>

    <el-table-column
      label="发布信息"
      prop="detail">
    </el-table-column>

    <el-table-column
      label="申请人"
      prop="applicant[0].name">
    </el-table-column>

    <el-table-column
      label="上线人"
      prop="assign_to[0].name">
    </el-table-column>

    <el-table-column
      label="状态"
      prop="status.name">
    </el-table-column>

    <el-table-column
      label="申请时间"
      prop="apply_time"
      :formatter="dateFormat"
      >
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.row)">详情</el-button>
      </template>
    </el-table-column>

  </el-table>
  </div>
</template>


<script>
import moment from 'moment'

export default {
  name: 'deploy-list',
  props: ['value'],
  methods: {
    /* 点击编辑按钮，将子组件的事件传递给父组件 */
    handleEdit(value) {
      this.$emit('edit', value)
    },

    dateFormat:function(row, column) {
      var date = row[column.property];
      if (date === undefined) {
             return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }

  }
}
</script>

<style lang='scss'>
.deploy-list {}
</style>

