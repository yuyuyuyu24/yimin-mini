<template>
  <div class="about-page">
    <div class="about-background">
      <image
        lazy-load=true
        class="about-background-img"
        @click="reviewBackground"
        mode="aspectFill"
        :src="adminData.background.url"
        v-if="adminData.background"
      ></image>
      <div class="about-headimg">
        <image
          lazy-load=true
          @click="reviewHeadimg"
          mode="widthFile"
          :src="adminData.head.url"
          v-if="adminData.head"
        ></image>
      </div>
    </div>
    <div class="about-introduce">
      <h2>商家自述</h2>
      <span>{{adminData.shopWord}}</span>
    </div>
    <div
      class="about-contact"
      @click='callPhone(adminData.phoneOne)'
    >
      <i class="iconfont icondianhua"></i>
      联系电话1 : <span><text selectable=true>{{adminData.phoneOne}}</text></span>
    </div>
    <div
      class="about-contact"
      @click='callPhone(adminData.phoneTwo)'
    >
      <i class="iconfont iconzuoji"></i>
      联系电话2 : <span><text selectable=true>{{adminData.phoneTwo}}</text></span>
    </div>
    <div class="about-contact-wechat">
      <i class="iconfont iconicon"></i>
      微信1 : <span><text selectable=true>{{weChatOne}}</text></span>
    </div>
    <div class="about-contact-wechat">
      <i class="iconfont iconicon"></i>
      微信2 : <span><text selectable=true>{{weChatTwo}}</text></span>
    </div>
    <div class="about-address">
      <div>
        <i class="iconfont iconicon-"></i>
        <h2>店铺地址</h2>
      </div>
      <span @click="checkAddressOne">新华店 : <span><text selectable=true>{{addressOne}}</text></span></span>
      <span @click="checkAddressTwo">全宁店 : <span><text selectable=true>{{addressTwo}}</text></span></span>
    </div>
    <div
      class="about-imgs"
      @click="toViewAtlas"
    >
      <i class="iconfont iconzhaopian"></i>
      查看图集
    </div>

  </div>
</template>

<script>
import { getAdminDetail } from '@/api/admin'
import querystring from 'querystring'

export default {
  data () {
    return {
      headimg: '',
      headimgList: [],
      backgroundImg: '',
      backgroundImgList: [],
      weChatOne: this.GLOBAL.WE_CHAT_ONE,
      weChatTwo: this.GLOBAL.WE_CHAT_TWO,
      addressOne: this.GLOBAL.ADDRESS_ONE,
      addressTwo: this.GLOBAL.ADDRESS_TWO,
      adminData: {}
    }
  },
  mounted () {
    this.getAdminDetailFun()
  },
  methods: {
    // 获取商家信息
    getAdminDetailFun () {
      let _this = this
      let id = 1
      getAdminDetail('admin/getAdminDetail', { id }).then(res => {
        if (res.data.data) {
          res.data.data.head = querystring.parse(res.data.data.head)
          res.data.data.background = querystring.parse(res.data.data.background)
          _this.adminData = res.data.data
          _this.headimg = res.data.data.head.url
          _this.headimgList.push(res.data.data.head.url)
          _this.backgroundImg = res.data.data.background.url
          _this.backgroundImgList.push(res.data.data.background.url)
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 预览头像
    reviewHeadimg () {
      wx.previewImage({
        current: this.headimg,
        urls: this.headimgList
      })
    },
    // 预览背景图
    reviewBackground () {
      wx.previewImage({
        current: this.backgroundImg,
        urls: this.backgroundImgList
      })
    },
    // 拨打电话
    callPhone (phone) {
      wx.makePhoneCall({
        phoneNumber: phone,
        fail () { }
      })
    },
    // 查看图集
    toViewAtlas () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: `/pages/viewAtlas/main`,
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    // 查看新华店
    checkAddressOne () {
      let that = this
      that.getLocation()
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          wx.openLocation({
            latitude: that.GLOBAL.ADDRESS_ONE_WEI, // 要去的纬度-地址
            longitude: that.GLOBAL.ADDRESS_ONE_JING, // 要去的经度-地址
            name: '新华店',
            address: that.addressOne
          })
        }
      })
    },
    // 查看全宁店
    checkAddressTwo () {
      let that = this
      that.getLocation()
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          wx.openLocation({
            latitude: that.GLOBAL.ADDRESS_TWO_WEI, // 要去的纬度-地址
            longitude: that.GLOBAL.ADDRESS_TWO_JING, // 要去的经度-地址
            name: '全宁店',
            address: that.addressTwo
          })
        }
      })
    },
    // 拒绝授权方法
    getLocation () {
      wx.getSetting({
        success (res) {
          if (!res.authSetting['scope.userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation',
              fail () {
                wx.hideLoading()
                wx.showModal({
                  title: '温馨提示',
                  content: '您已拒绝授权，是否去设置打开？',
                  confirmText: '确认',
                  cancelText: '取消',
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: (res) => {
                          res.authSetting = {
                            'scope.userLocation': true
                          }
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.about-background {
  width: 100%;
  height: 400rpx;
  position: relative;
}
.about-background-img {
  width: 100%;
  height: 400rpx;
}
.about-background .about-headimg {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  position: absolute;
  top: 120rpx;
  left: 295.2rpx;
}
.about-background .about-headimg image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.about-introduce {
  width: auto;
  height: auto;
  padding: 40rpx;
  border-top: 20rpx solid #f4f4f4;
  display: flex;
  flex-direction: column;
}
.about-introduce h2 {
  font-size: 20px;
  padding-bottom: 20rpx;
}
.about-introduce span {
  font-size: 32rpx;
  line-height: 48rpx;
}
.about-contact,
.about-contact-wechat {
  width: auto;
  height: auto;
  padding: 40rpx;
  border-top: 20rpx solid #f4f4f4;
  font-weight: 600;
  display: flex;
  align-items: center;
}
.about-contact i,
.about-address i,
.about-imgs i,
.about-contact-wechat i {
  padding-right: 24rpx;
  font-size: 22px;
  font-weight: 500;
}
.about-contact span {
  color: #1296db;
  padding-left: 8rpx;
}
.about-contact-wechat span {
  color: #508945;
  padding-left: 8rpx;
}
.about-address {
  width: auto;
  height: auto;
  padding: 40rpx;
  border-top: 20rpx solid #f4f4f4;
  display: flex;
  flex-direction: column;
}
.about-address div {
  display: flex;
  font-weight: 600;
  padding-bottom: 6rpx;
}
.about-address h2 {
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 10rpx;
}
.about-address span span {
  color: #889696;
  padding-bottom: 8rpx;
  display: block;
}
.about-imgs {
  width: auto;
  height: auto;
  padding: 40rpx;
  border-top: 20rpx solid #f4f4f4;
  font-weight: 600;
  border-bottom: 20rpx solid #f4f4f4;
  display: flex;
  align-items: center;
}
</style>
