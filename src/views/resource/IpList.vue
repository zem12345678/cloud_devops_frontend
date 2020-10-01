<template>
  <div class="user-list-container">
    <el-row :gutter="24">
      <el-col :span="12">
        <el-input v-model="search_key" placeholder="搜索" @keyup.enter.native="searchClick">
          <el-button slot="append" icon="el-icon-search" @click="searchClick" />
        </el-input>
      </el-col>
      <el-col :span="6" :offset="6" class="text-right">
        <el-button type="primary" @click="addClick">添加</el-button>
      </el-col>
    </el-row>
    <!-- 添加IP开始 -->
    <el-dialog title="添加IP" :visible.sync="isFormVisible">
      <el-form ref="addForm" :model="addForm" label-width="70px" :rules="addRule">
        <el-form-item label="IP地址" prop="ip_addr">
          <el-input v-model="addForm.ip_addr" placeholder="请输入IP地址" />
        </el-form-item>
        <el-form-item label="掩码" prop="netmask">
          <el-input v-model="addForm.netmask" placeholder="掩码" />
        </el-form-item>
        <el-form-item label="所绑定网卡" prop="device">
          <el-select v-model="addForm.device" class="select" filterable placeholder="绑定网卡">
            <el-option
              v-for="(item, index) in deviceList"
              :key="index"
              :label="item.name + ' ['+item.host.hostname+']'"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /结束 -->
    <!-- 修改IP开始 -->
    <el-dialog title="修改IP" :visible.sync="isEditFormVisible">
      <el-form ref="editForm" :model="editForm" label-width="70px" :rules="addRule">
        <el-form-item label="IP地址" prop="ip_addr">
          <el-input v-model="editForm.ip_addr" placeholder="请输入IP地址" />
        </el-form-item>
        <el-form-item label="掩码" prop="netmask">
          <el-input v-model="editForm.netmask" placeholder="请输入掩码" />
        </el-form-item>
        <el-form-item label="所绑定网卡" prop="device">
          <el-select v-model="editForm.device" class="select" filterable placeholder="绑定网卡">
            <el-option
              v-for="(item, index) in deviceList"
              :key="index"
              :label="item.name + ' ['+item.host.hostname+']'"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /结束 -->
    <el-table
      v-loading="loading"
      class="table"
      element-loading-text="拼命加载中"
      :data="dataList"
      border
    >
      <el-table-column
        prop="ip_addr"
        label="IP地址"
        align="center"
      />
      <el-table-column
        prop="netmask"
        label="掩码"
        align="center"
      />
      <el-table-column
        prop="device.name"
        label="绑定网卡"
        align="center"
      />
      <el-table-column
        prop=""
        label="操作"
        width="215"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editClick(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deleteClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="total_num>=10" class="text-center">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :current-page.sync="page"
        :total="total_num"
        @current-change="paginationChange"
      />
    </div>
  </div>
</template>

<script>
import { getIpList, addIP, updateIP, deleteIP, getNetworkDeviceList } from '@/api/resource/resource'

export default {
  data() {
    return {
      loading: false,
      dataList: [],
      deviceList: [],
      total_num: 0,
      page: 1,
      state: 0,

      search_key: '',
      isFormVisible: false,
      isEditFormVisible: false,
      editForm: {},
      addForm: {
        name: '',
        mac_addr: '',
        host: ''
      },
      addRule: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        mac_addr: [
          { required: true, message: '请输入电源功率', trigger: 'blur' }
        ],
        host: [
          { required: true, message: '请选择所在服务器', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    state() {
      this.fetchData()
      getNetworkDeviceList({ page_size: 0 }).then(res => {
        this.deviceList = res
      })
    }
  },
  created() {
    this.state = 1
  },
  methods: {
    fetchData() {
      this.loading = true
      console.log(this.search_key)
      getIpList({ page: this.page, ip_addr: this.search_key }).then(res => {
        this.dataList = res.results
        this.total_num = res.count
        this.loading = false
      })
    },
    searchClick() {
      this.page = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.page = val
      this.fetchData()
    },
    addClick() {
      this.isFormVisible = true
      if (this.$refs['addForm'] !== undefined) {
        this.$refs['addForm'].resetFields()
      }
    },
    submitForm() {
      this.$refs['addForm'].validate((valid) => {
        if (!valid) {
          return
        }
        const params = Object.assign({}, this.addForm)
        addIP(params).then(res => {
          this.isFormVisible = false
          this.fetchData()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      })
    },
    editClick(row) {
      if (this.$refs['editForm'] !== undefined) {
        this.$refs['editForm'].resetFields()
      }

      const { id, ip_addr, netmask } = row
      const { device } = { device: row.device.id }
      this.editForm = { id, ip_addr, netmask, device }
      this.isEditFormVisible = true
    },
    submitEditForm() {
      this.$refs['editForm'].validate((valid) => {
        if (!valid) {
          return
        }
        const id = this.editForm.id
        const params = this.editForm
        delete params.id
        updateIP(id, params).then(res => {
          this.isEditFormVisible = false
          this.fetchData()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      })
    },
    deleteClick(row) {
      this.$confirm('此操作将删除 “' + row.ip_addr + '” , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteIP(row.id).then(response => {
          this.$message({
            message: '删除 “' + row.ip_addr + '” 成功',
            type: 'success'
          })
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          message: '操作失败',
          type: 'error'
        })
      })
    }
  }
}
</script>
