<template>
  <div>
    <div>
      <div class="filter-container">
        <el-input v-model="query.username" placeholder="输入账户" style="width:300px" />
        <el-input v-model="query.hostname" placeholder="输入主机IP" style="width:300px" />
        <el-button style="margin-left:10px" type="primary" icon="el-icon-index" @click="handleFilter">查询</el-button>
        <el-button style="margin-left:10px" type="primary" icon="el-icon-edit" @click="modal_flag=true">添加权限</el-button>
        <!--      <el-button style="margin-left:10px" type="danger" icon="el-icon-edit" @click="handlerDelete">删除权限</el-button> -->
      </div>
      <el-table style="width:100%;margin-top:30px" :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="username" label="账户名" width="180" />
        <el-table-column prop="hostname" label="主机IP" />
        <el-table-column prop="appendgroups" label="加入用户组" />
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="_handlerUpdate(scope.$index, scope.row)"
            >update</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="_handlerDelete(scope.$index, scope.row)"
            >delete</el-button>
          </template>

        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="新建权限"
      :visible.sync="modal_flag"
      width="30%"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="账户">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="主机IP">
          <el-input v-model="form.hostname" />
        </el-form-item>
        <el-form-item label="添加用户组">
          <el-select v-model="form.appendgroups" multiple>
            <el-option v-for="g in groups" :key="g.group" :label="g.group" :value="g.group" />
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="modal_flag=false">取 消</el-button>
        <el-button type="primary" @click="handerCreate">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改权限"
      :visible.sync="umodal_flag"
      width="30%"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="账户">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="主机IP">
          <el-input v-model="form.hostname" />
        </el-form-item>
        <el-form-item label="添加用户组">
          <el-select v-model="form.appendgroups" multiple>
            <el-option v-for="g in groups" :key="g.group" :label="g.group" :value="g.group" />
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="umodal_flag=false">取 消</el-button>
        <el-button type="primary" @click="handlerUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      query: { 'username': '', 'hostname': '' },
      tableData: [],
      sourceData: [],
      form: { 'username': '', 'hostname': '', 'appendgroups': [] },
      groups: [],
      modal_flag: false,
      umodal_flag: false,
      select_id: '',
      url: '/api/v1/bastion/permission/',
      group_url: '/api/v1/bastion/group/'
    }
  },
  mounted() {
    this.query_groups()
    this.handleFilter()
  },
  methods: {
    handleSelectionChange() {

    },

    handleFilter() {
      axios.get(this.url, {
        params: {
          'username': this.query.username,
          'hostname': this.query.hostname
        }
      }).then(response => {
        this.sourceData = this.tableData = response.data
      })
    },
    handerCreate() {
      const dt = {
        'username': this.form.username,
        'hostname': this.form.hostname,
        'appendgroups': this.form.appendgroups.join(',')
      }

      axios.post(this.url, dt).then(response => {
        this.$message({
          message: '添加权限成功',
          type: 'success'
        })
        this.handleFilter()
      })
    },
    handlerDelete() {

    },
    _handlerDelete(index, row) {
      const url = `${this.url}retrieve/${row.id}/`
      axios.delete(url).then(response => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.handleFilter()
      })
    },
    _handlerUpdate(index, row) {
      this.umodal_flag = true
      this.select_id = row.id
      this.form = {
        'username': row.username,
        'hostname': row.hostname,
        'appendgroups': row.appendgroups.split(',')
      }
    },
    handlerUpdate() {
      const url = `${this.url}retrieve/${this.select_id}/`
      this.umodal_flag = false
      const dt = {
        'username': this.form.username,
        'hostname': this.form.hostname,
        'appendgroups': this.form.appendgroups.join(',')
      }
      console.log(url)
      axios.put(url, dt).then(response => {
        this.$message({
          message: '修改成功',
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
