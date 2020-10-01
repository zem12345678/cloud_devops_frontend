<template>
  <div>
    <div class="filter-container">
      <el-input v-model="filter.username" placeholder="用户名" style="width:200px" />
      <el-input v-model="filter.hostname" placeholder="执行主机IP" style="width:200px" />
      <el-input v-model="filter.exec_user" placeholder="执行用户" style="width:200px" />
      <el-input v-model="filter.command" placeholder="执行命令,支持模糊匹配" style="width:400px" />
      <el-date-picker
        v-model="filter.timerange"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <el-button style="margin-left:10px" type="primary" icon="el-icon-query" @click="handlerFilter">查询</el-button>
    </div>
    <el-table style="margin-top:30px" :data="tableData">
      <el-table-column prop="login_user" label="登陆用户" />
      <el-table-column prop="exec_user" label="执行用户" />
      <el-table-column prop="from_host" label="登陆主机" />
      <el-table-column prop="local_ip" label="执行主机" />
      <el-table-column prop="exec_pwd" label="执行目录" />
      <el-table-column prop="exec_time" label="执行时间" />
      <el-table-column prop="command_info" label="执行命令" />
    </el-table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      filter: { 'username': '', 'hostname': '', 'comannd': '', 'timerange': [] },
      term: null,
      url: '/api/v1/bastion/audit/',
      sourceData: [],
      tableData: [],
      date_format: 'yyyy-mm-dd h:MM:ss',
      ansi_up: ''
    }
  },

  mounted() {
    this.handlerFilter()
  },

  methods: {
    handlerFilter() {
      axios.get(this.url, {
        params: {
          login_user: this.filter.username,
          hostname: this.filter.hostname,
          exec_user: this.filter.exec_user,
          command_info: this.filter.command,
          exec_time__gte: this.filter.timerange[0] || new Date(new Date() - 24 * 60 * 60 * 1000),
          exec_time__lte: this.filter.timerange[1] || new Date()
        }
      }).then(response => {
        this.sourceData = this.tableData = response.data
      })
    }
  }

}

</script>
