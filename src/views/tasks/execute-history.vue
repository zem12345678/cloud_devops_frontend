<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>任务执行历史</span>
      </div>
      <div class="text item">
        <!--        <div class="filter-container">-->
        <!--          <el-input v-model="listQuery.name" placeholder="请输入内容" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />-->
        <!--          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">-->
        <!--            搜索-->
        <!--          </el-button>-->
        <!--        </div>-->

        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%; margin-top: 12px"
        >
          <el-table-column label="Agent">
            <template slot-scope="{row}">
              <span style="color: #20a0ff; cursor: pointer" @click="getTaskHistoryDetails(row)">
                {{ row.agent }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="UUID">
            <template slot-scope="{row}">
              <span>{{ row.uuid }}</span>
            </template>
          </el-table-column>
          <el-table-column label="任务名称">
            <template slot-scope="{row}">
              <span>{{ row.task_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="80">
            <template slot-scope="{row}">
              <span>{{ row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column label="开始时间" width="160">
            <template slot-scope="{row}">
              <span>{{ row.start_time | formatDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="结束时间" width="160">
            <template slot-scope="{row}">
              <span>{{ row.end_time | formatDate }}</span>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

      </div>
    </el-card>

    <el-dialog title="任务执行返回详情" :visible.sync="dialogFormVisible">
      {{ details }}
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
import {
  taskHistoryList,
  taskHistoryDetails
} from '@/api/task/task' // secondary package based on el-pagination

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
      dialogFormVisible: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      listLoading: true,
      tableKey: 0,
      list: null,
      total: 0,
      details: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1
    },
    getList() {
      this.listLoading = true
      taskHistoryList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    getTaskHistoryDetails(row) {
      taskHistoryDetails({
        agent: row.agent,
        uuid: row.uuid
      }).then(response => {
        this.details = response.data
        this.dialogFormVisible = true
      })
    }
  }
}
</script>
