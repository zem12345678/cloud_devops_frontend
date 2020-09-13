<template>
  <div class="deploy-form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">

      <el-form-item label="项目名称" prop="name">
        <el-input v-model="form.name" readonly></el-input>
      </el-form-item>

      <el-form-item label="项目版本" prop="version">
        <el-input v-model="form.version" readonly></el-input>
      </el-form-item>

      <el-form-item label="项目描述" prop="info">
        <el-input v-model="form.info" readonly></el-input>
      </el-form-item>

      <el-form-item label="项目详情" prop="detail">
        <el-input v-model="form.detail" type="textarea" rows="8" readonly></el-input>
      </el-form-item>


      <el-form-item>
        <div class="btn-wrapper">
          <el-button size="small" type="primary" @click="submitForm">下一步</el-button>
        </div>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>


export default {
  name: 'deploy-form',
  props: {
    form: {  // 接受父组件传递过来的值渲染表单
      type: Object,
      default() {
        return {
          name: '',
          info: '',
          version: '',
          detail: '',
          status: '',
        }
      }
    }
  },

  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入处理结果', trigger: 'blur' }
        ],
      }
    }
  },

  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        this.$emit('submit', this.form)
      })
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang='scss' scoped>
.deploy-form {
  position: relative;
  display: block;
  .btn-wrapper{
    text-align: right;
  }
}
</style>

