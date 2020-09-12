<template>
  <div class="BookForm">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-form">

      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称" />
      </el-form-item>

      <el-form-item label="作者" prop="authors">
        <el-select v-model="form.authors" multiple filterable style="width:100%" placeholder="请选择">
          <el-option
            v-for="item in author_list"
            :key="item.index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="出版社" prop="publisher">
        <el-select v-model="form.publisher" filterable placeholder="请选择">
          <el-option
            v-for="item in publish_list"
            :key="item.index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="出版日期" prop="publication_date">
        <el-date-picker
          v-model="form.publication_date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        />
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
import { getPublishList } from '@/api/books/publish'
import { getAuthorList } from '@/api/books/author'

export default {
  name: 'PublishForm',
  props: {
    form: { // 接受父组件传递过来的值渲染表单
      type: Object,
      default() {
        return {
          name: '',
          authors: [],
          publisher: [],
          publication_date: ''
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
        authors: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
        publisher: [
          { required: true, message: '请输入出版商', trigger: 'blur' }
        ],
        publication_date: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      },
      author_list: [],
      publish_list: [],
      state: 0
    }
  },
  watch: {
    state() {
      getPublishList({ page_size: 100 }).then(res => {
        this.publish_list = res.results
        console.log(this.publish_list)
      })
      getAuthorList({ page_size: 100 }).then(res => {
        this.author_list = res.results
      })
    }
  },

  created() {
    this.state = 1
  },

  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          console.log('1111')
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
.book-form {
  position: relative;
  display: block;
  .btn-wrapper{
    text-align: right;
  }
}
</style>

