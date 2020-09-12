<template>
  <div class="project-list">
  <el-table
    :data="value"
    border
    stripe
    style="width: 100%">

    <el-table-column
      label="项目名称"
      prop="path_with_namespace">
    </el-table-column>

    <el-table-column
      label="项目描述"
      prop="description">
    </el-table-column>

    <el-table-column
      label="项目地址"
      prop="web_url">
    </el-table-column>


  </el-table>
  </div>
</template>

<script>

import moment from 'moment'
export default {
  name: 'project-list',
  props: ['value'],
}
</script>

<style lang='scss'>
.project-list {}
</style>

