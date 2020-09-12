<template>
  <div class="apply">
    <el-form :model="form" :rules="rules" ref="form" label-width="180px">

      <el-form-item label="任务名称：" prop="name">
        <el-input v-model="form.name"  style="width: 60%;"></el-input>
      </el-form-item>

      <el-form-item label="上传文件：" prop="playbook">
	<el-upload
          action=""
          ref="upload"
          :file-list="filelist"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>	
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { createTask } from '@/api/task/task'
export default {
  data() {
    return {
      filelist: [],
      form: {
	name: '',
        playbook:''
      },
      rules: {
        name: [
          { required: true, message: '请输入任务名', trigger: 'blur' }
        ],
      }
    }
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        console.log(this.filelist)
        this.form.playbook = this.filelist[0]
        const params = Object.assign({}, this.form)
        console.log(params) 
        createTask(params).then(res => {
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
  },
 
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

