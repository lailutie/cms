<template>
  <div class="overview">
    <el-row :gutter="20">
      <el-col :span="16"><div class="grid-content bg-purple">VUE3</div></el-col>
      <el-col :span="8"
        ><div class="grid-content bg-purple">TYPESCRIPT</div></el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><div class="grid-content bg-purple">VUEX</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple">AXIOS</div></el-col>
      <el-col :span="4"
        ><div class="grid-content bg-purple">ECHARTS</div></el-col
      >
      <el-col :span="4"
        ><div class="grid-content bg-purple">ELEMENT-PLUS</div></el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4"><div class="grid-content bg-purple">LESS</div></el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple">WEBPACK5</div></el-col
      >
      <el-col :span="4"><div class="grid-content bg-purple">HOOKS</div></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'overview',
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  div {
    padding-top: 15px;
  }
}
.bg-purple-dark {
  background: #fc7d15;
}
.bg-purple {
  background: #b9dde7;
}
.bg-purple-light {
  background: #ee12a5;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #0e84b3;
}
</style>
