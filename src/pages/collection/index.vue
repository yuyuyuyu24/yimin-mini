<template>
  <div class="collection">
    <div
      class="collection-null"
      v-if="isCollectionNull"
    >
      <i class="iconfont iconno_result"></i>
      没有找到收藏的商品哦 ~
      <div @click="toIndex">去逛逛</div>
    </div>
    <div
      class="collections"
      v-if="!isCollectionNull"
    >
      <div class="collection-box">
        <div class="collection-box-content">
          <img />
          <div class="collection-box-content-right">
            <p>风干牛肉 500克</p>
            <span>库存量： 10</span>
            <h3>￥ 100</h3>
          </div>
        </div>
      </div>
      <div class="collection-box">
        <div class="collection-box-content">
          <img />
          <div class="collection-box-content-right">
            <p>风干牛肉 500克</p>
            <span>库存量： 10</span>
            <h3>￥ 100</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      isCollectionNull: false
    }
  },
  methods: {
    // 去逛逛跳转到首页
    toIndex () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.switchTab({
        url: '/pages/index/main',
        success: function (res) {
          wx.hideToast()
        }
      })
    }
  }
}
</script>
<style scoped>
.collection {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  border-top: 10rpx solid #f4f4f4;
}
.collections {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}
.collection .collection-null {
  width: 100%;
  height: 300rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 18px;
  margin-top: 100rpx;
}
.collection .collection-null i {
  font-size: 50px;
}
.collection .collection-null div {
  width: 120rpx;
  height: 60rpx;
  text-align: center;
  line-height: 60rpx;
  font-size: 16px;
  border: 1px solid #888;
}
.collection .collection-box {
  width: 100%;
  height: 300rpx;
  background-color: #fff;
  border-bottom: 10rpx solid #f4f4f4;
  display: flex;
  flex-direction: column;
}
.collection .collection-box .collection-box-content {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #f6f6f6;
  display: flex;
  align-items: center;
}
.collection .collection-box .collection-box-content img {
  width: 200rpx;
  height: 200rpx;
  border: 1px solid #ccc;
  margin-left: 20rpx;
  border-radius: 10rpx;
}
.collection
  .collection-box
  .collection-box-content
  .collection-box-content-right {
  width: auto;
  height: 200rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 40rpx;
}
.collection
  .collection-box
  .collection-box-content
  .collection-box-content-right
  p {
  font-size: 18px;
}
.collection
  .collection-box
  .collection-box-content
  .collection-box-content-right
  span {
  font-size: 12px;
  color: #666;
  padding-top: 20rpx;
}
.collection
  .collection-box
  .collection-box-content
  .collection-box-content-right
  h3 {
  font-size: 20px;
  padding-top: 40rpx;
}
</style>
