<template>
  <div>

    <div>
      <div class="filter-container">
        <el-input v-model="query_account" placeholder="输入账户进行搜索" style="width:300px" @keyup.enter.native="handleFilter" />
        <el-button style="margin-left:10px" type="primary" icon="el-icon-edit" @click="modal_flag=true">添加用户</el-button>
      </div>
      <el-table style="width:100%;margin-top:30px" :data="tableData">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="username" label="账户名" width="360" />
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >delete</el-button>
          </template>

        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="创建账户"
      :visible.sync="modal_flag"
      width="30%"
    >
      <el-form label-width="100px">
        <el-form-item label="帐户">
          <el-input v-model="form.account" placeholder="输入新建账户名" style="width:200px" />
        </el-form-item>
        <el-form-item label="添加用户组">
          <el-select v-model="form.group" placeholder="选择用户组">
            <el-option v-for="g in groups" :key="g.group" :label="g.group" :value="g.group" />
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="modal_flag = false">取 消</el-button>
        <el-button type="primary" @click="handerCreate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import { BastionAccount, BastionGroups } from '@/api/bastion'
export default {
  data() {
    return {
      query_account: '',
      tableData: [],
      sourceData: [],
      account: '',
      form: { 'account': '', 'group': '' },
      modal_flag: false,
      groups: [],
      url: 'http://101.132.235.226/api/v1/bastion/account/',
      group_url: 'http://101.132.235.226/api/v1/bastion/group/'
    }
  },
  mounted() {
    this.query_groups()
    this.handleFilter()
  },
  methods: {
    handleFilter() {
      axios.get(this.url, {
        params: {
          username: this.query_account
        }
      }).then(response => {
        this.sourceData = this.tableData = response.data
      })
    },
    handerCreate() {
      axios.post(this.url, {
        'username': this.form.account,
        'basegroup': this.form.group
      }).then(response => {
        this.$message({
          message: '添加用户成功',
          type: 'success'
        })
        this.handleFilter()
      })
    },

    handleDelete(index, row) {
      const url = `${this.url}retrieve/${row.username}/`
      axios.delete(url).then(e => {
        this.$message({
          message: '删除用户成功',
          type: 'success'
        })
        this.handleFilter()
      })
    },
    query_groups() {
      axios.get(this.group_url).then(response => {
        this.groups = response.data
      })
    }
  }
}

</script>
