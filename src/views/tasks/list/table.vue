<template>
  <div class="task-list">
  <el-table
    :data="value"
    border
    stripe
    style="width: 100%">

    <el-table-column
      label="任务名称"
      prop="name">
    </el-table-column>

    <el-table-column
      label="Playbook"
      :formatter="formatPlaybook"
      prop="playbook">
    </el-table-column>

    <el-table-column
      label="执行状态"
      prop="status"
      :formatter="formatStatus">
    </el-table-column>

    <el-table-column
      label="执行时间"
      :formatter="dateFormat"
      prop="exec_time">
    </el-table-column>


    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.row)">执行</el-button>

        <el-button
          size="mini"
          type="info"
          @click="handleDetail(scope.row)">详情</el-button>
      </template>
    </el-table-column>

  </el-table>
  </div>
</template>

<script>

import moment from 'moment'
export default {
  name: 'task-list',
  props: ['value'],
  methods: {
    /* 点击编辑按钮，将子组件的事件传递给父组件 */
    handleEdit(value) {
      this.$emit('edit', value)
    },

    /* 详情  */
    handleDetail(task) {
      const id = task.id
      this.$emit('detail', id)
    },

    formatStatus: function(row, column) {
      return row.status == 'Y' ? "已执行" : "未执行";
    },
    formatPlaybook: function(row, column) {
      return row.playbook.split("task")[1]
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
.task-list {}
</style>

