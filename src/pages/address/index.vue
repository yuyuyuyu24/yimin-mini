<template>
  <div class="address">
    <div
      class="address-null"
      v-if="isCollectionNull"
    >
      <i class="iconfont iconno_result"></i>
      还没有绑定收货地址呢！
    </div>
    <div
      class="address-box"
      v-if="!isCollectionNull"
    >
      <div class="address-box-body">
        <div class="address-box-body-top">
          <div>
            <p>于佳一</p>
            <h3>18647604888</h3>
          </div>
          <span>内蒙古自治区赤峰市翁牛特旗乌丹镇</span>
        </div>
        <div class="address-box-body-bottom">
          <van-radio-group :value="radio">
            <van-radio name="1">默认地址</van-radio>
          </van-radio-group>
          <p @click="toEditAddress">编辑</p>
        </div>
      </div>
    </div>
    <div
      class="address-add"
      @click="toAddAddress"
    >添加新地址</div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      isCollectionNull: false,
      radio: '1'
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
    },
    // 跳转编辑地址页面
    toEditAddress () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: '/pages/editAddress/main?type="edit"',
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    // 创建新的地址
    toAddAddress () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: '/pages/editAddress/main?type="add"',
        success: function (res) {
          wx.hideToast()
        }
      })
    }
  }
}
</script>
<style scoped>
.address {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  border-top: 10rpx solid #f4f4f4;
}
.address .address-null {
  width: 100%;
  height: 300rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 18px;
  margin-top: 100rpx;
}
.address .address-null i {
  font-size: 50px;
}
.address .address-null div {
  width: 120rpx;
  height: 60rpx;
  text-align: center;
  line-height: 60rpx;
  font-size: 16px;
  border: 1px solid #888;
}
.address .address-box {
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.address .address-box .address-box-body {
  width: 100%;
  height: 240rpx;
  border-bottom: 10rpx solid #f4f4f4;
  display: flex;
  flex-direction: column;
}
.address .address-box .address-box-body .address-box-body-top {
  width: auto;
  height: 160rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-bottom: 1px solid #f4f4f4;
  padding: 0 20px;
}
.address .address-box .address-box-body .address-box-body-top span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.address .address-box .address-box-body .address-box-body-top div {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.address .address-box .address-box-body .address-box-body-bottom {
  width: auto;
  height: 80rpx;
  display: flex;
  justify-content: space-between;
  padding: 0 40rpx;
  align-items: center;
}
.address .address-box .address-box-body .address-box-body-bottom p {
  width: 100rpx;
  height: 100%;
  text-align: center;
  line-height: 80rpx;
  color: #00bf6f;
  font-size: 18px;
}
.address-add {
  width: 100%;
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 18px;
  background-color: #00bf6f;
}
</style>
