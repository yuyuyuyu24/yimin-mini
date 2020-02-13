<template>
  <div class="about-page">
    <div class="about-background">
      <image  lazy-load=true class="about-background-img" @click="reviewBackground" mode="widthFile" :src="backgroundImg"></image>
      <div class="about-headimg">
        <image lazy-load=true @click="reviewHeadimg" mode="widthFile" :src="headimg"></image>
      </div>
    </div>
    <div class="about-introduce">
      <h2>商家自述</h2>
      <span>我们是我们是我们是我们是我们是我们是我们是我们是我们是我们是</span>
    </div>
    <div class="about-contact" @click='callPhone(phoneOne)'>
        <i class="iconfont icondianhua"></i>
      联系电话1 :  <span><text selectable=true>{{phoneOne}}</text></span>
    </div>
    <div class="about-contact" @click='callPhone(phoneTwo)'>
        <i class="iconfont iconzuoji"></i>
      联系电话2 :  <span><text selectable=true>{{phoneTwo}}</text></span>
    </div>
    <div class="about-contact-wechat">
      <i class="iconfont iconicon"></i>
      微信1 :  <span><text selectable=true>{{weChatOne}}</text></span>
    </div>
    <div class="about-contact-wechat">
      <i class="iconfont iconicon"></i>
      微信2 :  <span><text selectable=true>{{weChatTwo}}</text></span>
    </div>
    <div class="about-address">
      <div>
        <i class="iconfont iconicon-"></i>
        <h2>店铺地址</h2>
      </div>
      <span @click="checkAddressOne">新华店 :  <span><text selectable=true>{{addressOne}}</text></span></span>
      <span @click="checkAddressTwo">全宁店 :  <span><text selectable=true>{{addressTwo}}</text></span></span>
    </div>
    <div class="about-imgs" @click="toViewAtlas">
      <i class="iconfont iconzhaopian"></i>
      查看图集
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      headimg: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GC6nAyObTil3U7Yj.FPH60yg8oSeuE*R79CUhMsECdQgQF1GmFMxO7LIIROLUVJRQFCCtt1d*3hfm9Z2nm42pg4!/b&bo=OAQ4BAAAAAARFyA!&rf=viewer_4&t=5',
      headimgList: ['http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GC6nAyObTil3U7Yj.FPH60yg8oSeuE*R79CUhMsECdQgQF1GmFMxO7LIIROLUVJRQFCCtt1d*3hfm9Z2nm42pg4!/b&bo=OAQ4BAAAAAARFyA!&rf=viewer_4&t=5'],
      backgroundImg: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GHS0rXTHN*Vt3pUpz4.48tf8k.QEtk*hbinB8ZrZUFMr0R4PyWmYvo9j6HTAV.XNDnY*8IF7KHKOEL.*O8eN35k!/b&bo=NgR.AjYEfgIRFyA!&rf=viewer_4&t=5',
      backgroundImgList: ['http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GHS0rXTHN*Vt3pUpz4.48tf8k.QEtk*hbinB8ZrZUFMr0R4PyWmYvo9j6HTAV.XNDnY*8IF7KHKOEL.*O8eN35k!/b&bo=NgR.AjYEfgIRFyA!&rf=viewer_4&t=5'],
      phoneOne: this.GLOBAL.PHONE_ONE,
      phoneTwo: this.GLOBAL.PHONE_TWO,
      weChatOne: this.GLOBAL.WE_CHAT_ONE,
      weChatTwo: this.GLOBAL.WE_CHAT_TWO,
      addressOne: this.GLOBAL.ADDRESS_ONE,
      addressTwo: this.GLOBAL.ADDRESS_TWO
    }
  },
  methods: {
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
      console.log(phone)
      wx.makePhoneCall({
        phoneNumber: phone,
        fail (err) {
          console.log(err)
        }
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
      wx.getLocation({
        type: 'gcj02',
        fail (err) {
          console.log(err)
        },
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
      wx.getLocation({
        type: 'gcj02',
        fail (err) {
          console.log(err)
        },
        success: function (res) {
          wx.openLocation({
            latitude: that.GLOBAL.ADDRESS_TWO_WEI, // 要去的纬度-地址
            longitude: that.GLOBAL.ADDRESS_TWO_JING, // 要去的经度-地址
            name: '新华店',
            address: that.addressOne
          })
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
  font-size: 14px;
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
