<template>
  <div class="idc">
    <el-button type="primary" @click="add" size="small">新增IDC</el-button>
    <idc-list :value="idcs" @edit="handleEdit" @delete="handleDelete"></idc-list>

    <el-dialog
      title="新增"
      :visible.sync="dialogVisibleForAdd"
      width="50%">
      <idc-form
        ref="idcForm"
        :is-loading="isLoadingCreateIdc"
        @submit="handleSubmitAdd"
        @cancel="handleCancelAdd">
      </idc-form>
    </el-dialog>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisibleForEdit"
      width="50%">
      <idc-form
        ref="idcForm"
        :is-loading="isLoadingEditIdc"
        :form="currentValue"
        @submit="handleSubmitEdit"
        @cancel="handleCancelEdit">
      </idc-form>
    </el-dialog>
  </div>
</template>

<script>
import { getIdcsList, createIdc, deleteIdc, updateIdc } from '@/api/idcs'
import IdcList from './list'
import IdcForm from './form'

export default {
  name: 'idc',
  components: {
    IdcList,
    IdcForm
  },
  data() {
    return {
      dialogVisibleForAdd: false,
      dialogVisibleForEdit: false,
      idcs: [],
      isLoadingCreateIdc: false,
      isLoadingEditIdc: false,
      currentValue: {}
    }
  },
  methods: {
    fetchData() {
      getIdcsList().then(
        res => {
          this.idcs = res.data.results
        }
      )
    },
    add() {
      this.dialogVisibleForAdd = true
    },
    handleSubmitAdd(value) {
      this.isLoadingCreateIdc = true
      createIdc(value).then(
        () => {
          this.fetchData()
          this.handleCancelAdd()
          this.isLoadingCreateIdc = false
        },
        () => { this.isLoadingCreateIdc = false }
      )
    },
    handleSubmitEdit(value) {
      this.isLoadingEditIdc = true
      const { id, ...params } = value
      updateIdc({ id, params }).then(
        () => {
          this.fetchData()
          this.handleCancelEdit()
          this.isLoadingEditIdc = false
        },
        () => { this.isLoadingEditIdc = false }
      )
    },
    handleCancelAdd() {
      this.dialogVisibleForAdd = false
      this.$refs.idcForm.$refs.form.resetFields()
    },
    handleCancelEdit() {
      this.dialogVisibleForEdit = false
      this.$refs.idcForm.$refs.form.resetFields()
    },
    handleDelete(id) {
      deleteIdc(id).then(
        () => {
          this.fetchData()
        },
        err => {
          console.log(err.message)
        }
      )
    },
    handleEdit(value) {
      this.currentValue = { ...value }
      this.dialogVisibleForEdit = true
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang='scss' scoped>
.idc {
  padding: 10px;
}
</style>
