<template>
  <div
    class="back-top"
    @click="goTop"
  >
    <i class="iconfont iconsvg-"></i>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    goTop () {
      this.$parent.fatherMethod()
    }
  }

}
</script>
<style scoped>
.back-top {
  width: 80rpx;
  height: 80rpx;
  background-color: #ddd;
  font-size: 18rpx;
  border-radius: 10rpx;
  color: #fff;
  text-align: center;
  line-height: 80rpx;
  position: fixed;
  right: 40rpx;
  bottom: 100rpx;
  z-index: 99;
}
</style>
