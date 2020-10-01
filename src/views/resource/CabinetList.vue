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
    <!-- 添加机柜开始 -->
    <el-dialog title="添加机柜" :visible.sync="isFormVisible">
      <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addRule">
        <el-form-item label="机柜名称" prop="name">
          <el-input v-model="addForm.name" maxlength="20" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="电源功率" prop="power_supply">
          <el-input v-model="addForm.power_supply" maxlength="5" placeholder="请输入电源功率" />
        </el-form-item>
        <el-form-item label="所在机房" prop="idc">
          <el-select v-model="addForm.idc" class="select" placeholder="所在机房">
            <el-option
              v-for="(item, index) in idcList"
              :key="index"
              :label="item.name"
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
    <!-- 修改机柜开始 -->
    <el-dialog title="修改机柜" :visible.sync="isEditFormVisible">
      <el-form ref="editForm" :model="editForm" label-width="80px" :rules="addRule">
        <el-form-item label="机柜名称" prop="name">
          <el-input v-model="editForm.name" maxlength="20" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="电源功率" prop="power_supply">
          <el-input v-model="editForm.power_supply" maxlength="5" placeholder="请输入电源功率" />
        </el-form-item>
        <el-form-item label="所在机房" prop="idc">
          <el-select v-model="editForm.idc" class="select" placeholder="所在机房">
            <el-option
              v-for="(item, index) in idcList"
              :key="index"
              :label="item.name"
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
        prop="name"
        label="机柜名称"
        align="center"
      />
      <el-table-column
        prop="power_supply"
        label="电源功率"
        align="center"
      />
      <el-table-column
        prop="idc.name"
        label="所在机房"
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
import { getCabinetList, addCabinet, updateCabinet, deleteCabinet, getIdcList } from '@/api/resource/resource'

export default {
  data() {
    const valNum = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请输入电源功率'))
      } else {
        if ((/^\d+\.?\d{0,2}$/).test(value) === false) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }
    }
    return {
      loading: false,
      dataList: [],
      idcList: [],
      total_num: 0,
      page: 1,
      state: 0,

      search_key: '',
      isFormVisible: false,
      isEditFormVisible: false,
      editForm: {},
      addForm: {
        name: '',
        power_supply: '',
        idc: ''
      },
      addRule: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        power_supply: [
          { required: true, validator: valNum, trigger: 'blur' }
        ],
        idc: [
          { required: true, message: '请选择所在机房', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    state() {
      this.fetchData()
      getIdcList({ page_size: 0 }).then(res => {
        this.idcList = res
      })
    }
  },
  created() {
    this.state = 1
  },
  methods: {
    fetchData() {
      this.loading = true
      getCabinetList({ page: this.page, name: this.search_key }).then(res => {
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
        addCabinet(params).then(res => {
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

      const { id, name, power_supply } = row
      const { idc } = { idc: row.idc.id }
      this.editForm = { id, name, power_supply, idc }
      this.isEditFormVisible = true
    },
    submitEditForm() {
      this.$refs['editForm'].validate((valid) => {
        if (!valid) {
          return
        }
        updateCabinet(this.editForm.id, this.editForm).then(res => {
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
      this.$confirm('此操作将删除 “' + row.name + '” , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCabinet(row.id).then(response => {
          this.$message({
            message: '删除 “' + row.name + '” 成功',
            type: 'success'
          })
          if (this.dataList.length === 1 && this.page > 1) {
            this.page = this.page - 1
          }
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
