<template>
  <div class="my">
    <div class="my-head">
      <div class="my-head-img">
        <img
          :v-if="userMeg.userImg"
          :src="userMeg.userImg"
        />
        <span v-if="userMeg.userName">{{userMeg.userName}}</span>
        <span v-if="!userMeg.userName">登录获取头像名称</span>
      </div>
      <div
        class="my-head-vip"
        @click="toShopCard"
      >
        办理购物卡 既享<span> 超 </span>多优惠
        <i class="iconfont iconhuangguan"></i>
      </div>
    </div>
    <div class="my-content">
      <div
        class="my-content-order"
        @click="toMyOrder"
      >
        <div>
          <i class="iconfont icondingdan"></i>
          我的订单
        </div>
        <i class="iconfont iconyou"></i>
      </div>
      <div
        class="my-content-collection"
        @click="toCollection"
      >
        <div>
          <i class="iconfont iconshoucangjia"></i>
          收藏夹
        </div>
        <i class="iconfont iconyou"></i>
      </div>
      <div
        class="my-content-address"
        @click="toAddress"
      >
        <div>
          <i class="iconfont icondizhi"></i>
          地址管理
        </div>
        <i class="iconfont iconyou"></i>
      </div>
      <button
        class="my-content-contact"
        open-type="contact"
      >
        <div>
          <i class="iconfont iconlianxikefu"></i>
          联系客服
        </div>
        <i class="iconfont iconyou"></i>
      </button>
      <div
        class="my-content-about"
        @click="toAboutShop"
      >
        <div>
          <i class="iconfont iconguanyu"></i>
          关于商家
        </div>
        <i class="iconfont iconyou"></i>
      </div>

    </div>
    <div
      v-if="false"
      class="lag-out"
    >退出登录</div>
    <div
      class="support"
      @click="call"
    >技术支持：<i class="iconfont iconicon"></i>wxdzy777</div>
    <van-dialog id="van-dialog" />

  </div>
</template>
<script>

import Dialog from '../../../static/vant/dist/dialog/dialog'
export default {
  data () {
    return {
      userMeg: {}
    }
  },
  onShow () {
    let _this = this
    wx.checkSession({
      success (res) {
        let value = wx.getStorageSync('userMegList')
        if (!value) {
          Dialog.alert({
            title: '提示',
            message: '很抱歉，您还未登录。登录后即可体验超多的优质服务 ~'
          }).then(() => {
            wx.navigateTo({
              url: `/pages/loginPage/main`
            })
          })
        } else {
          _this.userMeg = value
        }
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        // wx.login() // 重新登录
        Dialog.alert({
          title: '提示',
          message: '很抱歉，您还未登录。登录后即可体验超多的优质服务 ~'
        }).then(() => {
          wx.navigateTo({
            url: `/pages/loginPage/main`
          })
        })
      }
    })
  },
  methods: {
    // 跳转至我的订单
    toMyOrder () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: '/pages/order/main',
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    // 跳转到我的收藏
    toCollection () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: '/pages/collection/main',
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    // 跳转到地址管理
    toAddress () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: '/pages/address/main',
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    // 跳转到关于商家
    toAboutShop () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: '/pages/about/main',
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    // 跳转到购物卡
    toShopCard () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: '/pages/shopCard/main',
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    // 拨打电话
    call () {
      wx.makePhoneCall({
        phoneNumber: '18647604886',
        fail () { }
      })
    }

  }
}
</script>
<style scoped>
.my {
  width: 100%;
  height: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.my .my-head {
  width: 100%;
  height: 350rpx;
  background-color: #00bf6f;
  border-bottom-left-radius: 400rpx 80rpx;
  border-bottom-right-radius: 400rpx 80rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}
.my .my-head .my-head-img {
  width: 100%;
  height: 160rpx;
  display: flex;
  align-items: center;
  margin: 40rpx 0;
}
.my .my-head .my-head-img img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin: 0 30rpx 0 80rpx;
}
.my .my-head .my-head-img span {
  color: #fff;
  font-size: 18px;
}

.my .my-head .my-head-vip {
  width: 88%;
  height: 160rpx;
  background: rgba(0, 0, 0, 0.7);
  border-top-left-radius: 10rpx;
  border-top-right-radius: 10rpx;
  display: flex;
  align-items: center;
  color: #bfbfbf;
  font-size: 16px;
  justify-content: center;
}
.my .my-head .my-head-vip span {
  font-size: 22px;
  color: #fff;
  padding: 0 10rpx;
}
.my .my-head .my-head-vip i {
  font-size: 40px;
  padding-left: 40rpx;
}
.my .my-content {
  width: 93%;
  height: auto;
  display: flex;
  background-color: #fff;
  box-shadow: darkgrey 0 0 30rpx -10rpx;
  margin: 0rpx auto;
  border-radius: 10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40rpx;
}
.my .my-content .my-content-order,
.my-content-collection,
.my-content-address,
.my-content-contact {
  width: 90%;
  height: 120rpx;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.my .my-content .my-content-about {
  width: 90%;
  height: 120rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.my .my-content .my-content-order div,
.my-content-collection div,
.my-content-address div,
.my-content-contact div,
.my-content-about div {
  display: flex;
  align-items: center;
  font-size: 16px;
}
.my .my-content .my-content-order div i,
.my-content-collection div i,
.my-content-address div i,
.my-content-contact div i,
.my-content-about div i {
  font-size: 24px;
  padding-right: 20rpx;
}
.my .my-content .my-content-order div .iconyou,
.my-content-collection div .iconyou,
.my-content-address div .iconyou,
.my-content-contact div .iconyou,
.my-content-about div .iconyou {
  font-size: 18px;
}

.my .lag-out {
  width: 70%;
  height: 80rpx;
  border-radius: 10rpx;
  background-color: #00bf6f;
  text-align: center;
  line-height: 80rpx;
  color: #fff;
  margin: 40rpx auto;
}
.support {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40rpx;
  color: #666;
}
.support i {
  padding-right: 10rpx;
}
button::after {
  border: none;
}

button {
  background-color: transparent;

  padding-left: 0;

  padding-right: 0;

  line-height: inherit;
}

button {
  border-radius: 0;
}
</style>
