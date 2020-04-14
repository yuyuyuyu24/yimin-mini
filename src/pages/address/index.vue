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
      <div
        class="address-box-body"
        v-for="(item,index) in addressData"
        :key="index"
      >
        <div class="address-box-body-top">
          <div>
            <p>{{item.name}}</p>
            <h3>{{item.phone}}</h3>
          </div>
          <span>{{item.address}}</span>
        </div>
        <div class="address-box-body-bottom">
          <van-radio-group
            :value="radio"
            @change="onChange(index)"
          >
            <van-radio :name="item.isDefault">默认地址</van-radio>
          </van-radio-group>
          <p @click="deleteAddress(index)">删除</p>
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
      radio: true,
      addressData: []
    }
  },
  onShow () {
    this.getAddress()
  },
  methods: {
    // 取本地缓存方法
    getAddress () {
      let value = wx.getStorageSync('yiminAddress') || []
      if (value.length === 0) {
        this.isCollectionNull = true
      } else {
        this.isCollectionNull = false
        this.addressData = value
      }
    },
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
    // 创建新的地址
    toAddAddress () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: '/pages/editAddress/main',
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    // 切换默认地址
    onChange (index) {
      let list = this.addressData
      for (let i = 0; i < list.length; i++) {
        list[i].isDefault = false
      }
      list[index].isDefault = true
      this.addressData = list
      wx.setStorageSync('yiminAddress', this.addressData)
    },
    // 删除地址
    deleteAddress (index) {
      let _this = this
      wx.showModal({
        title: '提示',
        content: '确定要删除该收货地址吗？',
        success (res) {
          if (res.confirm) {
            let list = JSON.parse(JSON.stringify(_this.addressData))
            list.splice(index, 1)
            if (index !== 0) {
              list[0].isDefault = true
            }
            _this.addressData = list
            wx.setStorageSync('yiminAddress', _this.addressData)
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000
            })
            _this.getAddress()
          }
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
  color: red;
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
