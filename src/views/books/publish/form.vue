<template>
  <div class="PublishForm">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-form">

      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称" />
      </el-form-item>

      <el-form-item label="城市" prop="city">
        <el-input v-model="form.city" placeholder="请输入城市" />
      </el-form-item>

      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入地址" />
      </el-form-item>

      <el-form-item>
        <div class="btn-wrapper">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button size="small" type="primary" @click="submitForm">保存</el-button>
        </div>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

export default {
  name: 'PublishForm',
  props: {
    form: { // 接受父组件传递过来的值渲染表单
      type: Object,
      default() {
        return {
          name: '',
          city: '',
          address: ''
        }
      }
    }
  },

  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        console.log(this.form)
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
.publish-form {
  position: relative;
  display: block;
  .btn-wrapper{
    text-align: right;
  }
}
</style>

