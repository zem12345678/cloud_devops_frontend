<template>
  <div class="apply">
    <el-form ref="form" :model="form" :rules="rules" label-width="180px">

      <el-form-item label="任务名称：" prop="name">
        <el-input v-model="form.name" style="width: 60%;" />
      </el-form-item>

      <el-form-item label="上传文件：" prop="playbook">
        <input ref="files" type="file" @change="getFile($event)">
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit($event)">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { createTask } from '@/api/task/task'
export default {
  data() {
    return {
      form: {
        name: '',
        playbook: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入任务名', trigger: 'blur' }
        ],
        playbook: [
          { required: true, message: '请上传文件', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    getFile(event) {
      console.log(this.$refs.files.files[0])
      this.form.playbook = event.target.files[0]
      console.log(this.form.playbook)
    },
    onSubmit(event) {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        event.preventDefault()
        const formData = new FormData()
        formData.append('name', this.form.name)
        formData.append('playbook', this.form.playbook)

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        createTask(formData, config).then(res => {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.$router.push({ path: '/tasks/list' })
        })
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }

}
</script>

<style scoped>
.line{
  text-align: center;
}
.apply{
    margin-top:2cm;
}
</style>

