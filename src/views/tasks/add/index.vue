<template>
  <div class="apply">
    <el-form ref="form" :model="form" :rules="rules" label-width="180px">

      <el-form-item label="任务名称：" prop="name">
        <el-input v-model="form.name" style="width: 60%;" />
      </el-form-item>

      <el-form-item label="上传文件：" prop="playbook">
        <el-upload
          ref="upload"
          action=""
          :file-list="filelist"
          :auto-upload="false"
          @onchange="getFile($event)"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { createAutoTask } from '@/api/task/task'
export default {
  data() {
    return {
      filelist: [],
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
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        console.log(this.filelist)
        this.form.playbook = this.filelist[0]
        const params = Object.assign({}, this.form)
        console.log(params)
        createAutoTask(params).then(res => {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.onCancel()
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

