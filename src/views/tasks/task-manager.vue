<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>任务管理</span>
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
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="申请时间">
            <template slot-scope="{row}">
              <span>{{ row.create_date | formatDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button size="mini" type="primary" @click="handleExecute(row)">
                执行
              </el-button>
              <el-button size="mini" type="success" @click="handleEdit(row)">
                编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

      </div>
    </el-card>

    <el-dialog title="新增工具" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="工具名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="工具备注" :label-width="formLabelWidth">
          <el-input v-model="form.description" type="textarea" autocomplete="off" />
        </el-form-item>
        <el-form-item label="工具内容" :label-width="formLabelWidth">
          <codemirror v-model="form.content" :options="cmOptions" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitSaveTools">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="执行任务" :visible.sync="dialogFormVisibleAgent">
      <el-form :model="form">
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
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisibleAgent = false">取 消</el-button>
        <el-button type="primary" @click="executeTask">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'

import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'
// import base style
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodemirror)
// language
import 'codemirror/mode/python/python.js'
// theme css
import 'codemirror/theme/base16-light.css'

// require active-line.js
import 'codemirror/addon/selection/active-line.js'
// closebrackets
import 'codemirror/addon/edit/closebrackets.js'
// keyMap
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'
import 'codemirror/keymap/emacs.js'

import {
  taskList,
  createTask,
  deleteTask,
  executeTask
} from '@/api/task/task' // secondary package based on el-pagination

import {
  agentList
} from '@/api/system' // secondary package based on el-pagination

export default {
  name: 'Classification',
  components: {
    Pagination
  },
  directives: { waves },
  filters: {
    formatDate: function(date) {
      return moment.utc(date).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      listAgentLoading: false,
      dialogFormVisible: false,
      dialogFormVisibleAgent: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      listLoading: true,
      tableKey: 0,
      list: null,
      total: 0,
      agentList: null,
      agentTotal: 0,
      form: {
        name: '',
        content: '',
        description: ''
      },
      formLabelWidth: '120px',
      cmOptions: {
        tabSize: 4,
        mode: 'text/x-python',
        theme: 'base16-light',
        lineNumbers: true,
        line: true,
        autoCloseBrackets: true,
        keyMap: 'emacs'
      },
      taskForm: {
        task: {
          task_id: '',
          script: ''
        },
        targets: []
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSelectionChange(val) {
      for (var v of val) {
        this.taskForm.targets.push(v.agent_id)
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
    handleFilter() {
      this.listQuery.page = 1
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTask({
          id: row.id
        }).then(response => {
          this.$notify({
            title: '删除',
            message: '已删除',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getList() {
      this.listLoading = true
      taskList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetForm() {
      this.form = {
        name: '',
        content: '',
        description: ''
      }
    },
    handleExecute(row) {
      this.getAgentList()
      this.taskForm.task.task_id = row.id
      this.taskForm.task.script = row.content
      this.dialogFormVisibleAgent = true
      this.taskForm.targets = []
    },
    handleCreate() {
      this.resetForm()
      this.dialogFormVisible = true
    },
    handleEdit(row) {
      this.form = {
        id: row.id,
        name: row.name,
        content: row.content,
        description: row.description
      }
      this.dialogFormVisible = true
    },
    submitSaveTools() {
      if (this.form.name === '' || this.form.content === '') {
        this.$notify({
          title: '失败',
          message: '名称或内容不能为空',
          type: 'error',
          duration: 2000
        })
        return false
      }
      createTask(this.form).then(() => {
        this.getList()
        this.dialogFormVisible = false
      })
    },
    executeTask() {
      if (this.taskForm.targets.length > 0) {
        executeTask(this.taskForm).then(response => {
          this.dialogFormVisibleAgent = false
        })
      } else {
        this.$notify({
          title: '失败',
          message: '未选择agent',
          type: 'error',
          duration: 2000
        })
      }
    }
  }
}
</script>
