<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>定时任务管理</span>
      </div>
      <div class="text item">
        <div class="filter-container">
          <el-input v-model="listQuery.name" placeholder="请输入内容" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            搜索
          </el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
            新建
          </el-button>
        </div>

        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%; margin-top: 12px"
        >
          <el-table-column label="ID">
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="任务名称">
            <template slot-scope="{row}">
              <span>{{ row.task_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="下次执行时间">
            <template slot-scope="{row}">
              <span>{{ row.next_run_time | formatDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button
                size="mini"
                :type="row.next_run_time===null?'primary':'info'"
                @click="row.next_run_time===null?handleUpdateStatus(row, 1):handleUpdateStatus(row, 0)"
              >
                {{ row.next_run_time===null?'开启':'暂停' }}
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

      </div>

      <el-dialog title="创建定时任务" :visible.sync="dialogFormVisible">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="任务名称" prop="task_id">
            <el-select v-model="ruleForm.task_id" clearable filterable placeholder="请选择任务" style="width: 50%">
              <el-option
                v-for="(items, index) in allTaskList"
                :key="index"
                :label="items.name"
                :value="items.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="执行时间" prop="execution_way">
            <el-input v-model="ruleForm.execution_way" placeholder="请选择执行时间" style="width: 50%" />
          </el-form-item>
          <el-form-item label="Agent" prop="targets">
            <el-table
              :key="tableKey"
              v-loading="listAgentLoading"
              :data="agentList"
              border
              fit
              highlight-current-row
              style="width: 100%; margin-top: 12px"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="55"
              />
              <el-table-column label="AgentID" width="300">
                <template slot-scope="{row}">
                  <span>{{ row.agent_id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="IP地址">
                <template slot-scope="{row}">
                  <span>{{ row.ipaddress }}</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination v-show="agentTotal>0" :total="agentTotal" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAgentList" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitSaveTask('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
import {
  scheduledTaskList,
  deleteScheduledTask,
  taskList,
  createScheduledTask,
  updateScheduledTaskStatus
} from '@/api/task/task' // secondary package based on el-pagination

import {
  agentList
} from '@/api/system' // secondary package based on el-pagination

export default {
  name: 'Classification',
  components: { Pagination },
  directives: { waves },
  filters: {
    formatDate: function(date) {
      return moment.utc(date).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      allTaskList: '',
      listAgentLoading: false,
      agentList: null,
      agentTotal: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      listLoading: true,
      tableKey: 0,
      list: null,
      total: 0,
      dialogFormVisible: false,
      ruleForm: {
        execution_way: '',
        task_id: '',
        targets: ''
      },
      rules: {
        execution_way: [
          { required: true, message: '请输入执行时间', trigger: 'blur' }
        ],
        task_id: [
          { required: true, message: '请选择任务', trigger: 'change' }
        ],
        targets: [
          { required: true, message: '请选择执行的agent', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getAllTaskList()
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1
    },
    submitSaveTask(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createScheduledTask(this.ruleForm).then(response => {
            this.getList()
            this.dialogFormVisible = false
          })
        } else {
          return false
        }
      })
    },
    handleSelectionChange(val) {
      for (var v of val) {
        if (this.ruleForm.targets === '') {
          this.ruleForm.targets = [v.agent_id]
        } else {
          this.ruleForm.targets.push(v.agent_id)
        }
      }
    },
    getAgentList() {
      this.listAgentLoading = true
      agentList(this.listQuery).then(response => {
        this.agentList = response.data.list
        this.agentTotal = response.data.total
        this.listAgentLoading = false
      })
    },
    getAllTaskList() {
      taskList({
        page: 1,
        limit: 99999
      }).then(response => {
        this.allTaskList = response.data.list
      })
    },
    getList() {
      this.listLoading = true
      scheduledTaskList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var jsonParams = {
          job_id: row.id
        }
        deleteScheduledTask(jsonParams).then(() => {
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.listQuery.page = 1
      this.getAllTaskList()
      this.getAgentList()
    },
    handleUpdateStatus(row, status) {
      updateScheduledTaskStatus({
        job_id: row.id,
        status: status
      }).then(() => {
        this.getList()
      })
    }
  }
}
</script>

<style scoped>
  .pagination-container {
    padding: 15px 16px 0 16px;
  }
</style>
