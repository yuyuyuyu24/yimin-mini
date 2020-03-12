<template>
  <div class="page">
    <back-top v-if="isBack"></back-top>
    <div
      class="search-box"
      @click="toSearch"
    >
      <div class="search">
        <i class="iconfont iconsousuo-copy"></i>
        <p>搜索你想要的商品...</p>
      </div>
    </div>
    <div class="swiper-box">
      <swiper
        class="swiper"
        indicator-dots=true
        autoplay=true
        interval=5000
      >
        <swiper-item
          v-for="(item,index) in swiperList"
          :key=index
          @click="viewSwiper(index)"
        >
          <view>
            <image
              lazy-load=true
              mode="widthFile"
              :src="item.url"
            ></image>
          </view>
        </swiper-item>
      </swiper>
    </div>
    <div
      class="notice-box"
      v-if="pageNotice.noticeStatus === 1"
    >
      <div class="notice">
        <i class="iconfont icongonggao"></i>
        <div class="notice-view">
          <view
            class="message-title"
            :animation="animationData"
            :style="{'transform': 'translateX('+-marqueeDistance+'px)'}"
          >
            {{pageNotice.noticeContent}}
          </view>
        </div>
      </div>
    </div>
    <div class="classification">
      <div @click="toCattle">
        <image
          mode='widthFix'
          src="../../static/images/cattle.png"
        ></image>
        牛肉
      </div>
      <div @click="toSheep">
        <image
          mode='widthFix'
          src="../../static/images/sheep.png"
        ></image>
        羊肉
      </div>
      <div @click="toChicken">
        <image
          mode='widthFix'
          src="../../static/images/chicken.png"
        ></image>
        鸡产品
      </div>
      <div @click="toOther">
        <image
          mode='widthFix'
          src="../../static/images/other.png"
        ></image>
        其他
      </div>
    </div>
    <div class="hot-goods-box">
      <div class="hot-goods-title">
        <h2>精选商品</h2>
        <i class="iconfont iconHOT"></i>
      </div>
      <div class="hot-goods">
        <div
          v-for="(item,index) in hotGoods"
          :key="index"
          @click="toDetails(item)"
          class="hot-goods-div"
        >
          <div
            class="yishouqing"
            v-if="item.goodsStatus === 2"
          >已 售 罄</div>
          <image
            lazy-load=true
            mode="widthFile"
            :src='item.coverList.url'
          ></image>
          <p>{{item.goodsName}}</p>
          <span class="price">
            <span class="price-sign">￥</span>{{item.goodsPrice}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backTop from '@/components/backTop'
// 导入精选商品数据
import { getSwiper } from '@/api/swiper'
import { getNotice } from '@/api/notice'
import { queryHotGoods } from '@/api/goods'
import { changeQuerystring, ENCODE } from '@/utils/function'

export default {
  data () {
    return {
      hotGoods: [],
      isBack: false,
      swiperList: [],
      pageNotice: {},
      marqueePace: 1, // 滚动速度
      marqueeDistance: 0, // 初始滚动距离
      marquee_margin: 30,
      size: 14,
      interval: 100,
      length: '',
      windowWidth: ''

    }
  },
  components: {
    backTop
  },
  onPageScroll (e) {
    if (e.scrollTop > this.GLOBAL.SCROLL_TOP) {
      this.isBack = true
    } else {
      this.isBack = false
    }
  },
  created () {
    this.getSwiperFun()
    this.getNoticeFun()
    this.queryHotGoodsFun()
  },
  mounted () {
    var that = this
    var length = that.pageNotice.noticeContent.length * that.size// 文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth// 屏幕宽度
    that.length = length
    that.windowWidth = windowWidth

    that.scrolltxt()
  },
  methods: {
    scrolltxt: function () {
      var that = this
      var length = that.length// 滚动文字的宽度
      var windowWidth = that.windowWidth// 屏幕宽度
      if (length > windowWidth) {
        var interval = setInterval(function () {
          var maxscrollwidth = windowWidth * 0.9 * 0.9 + 50// 滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可

          var crentleft = that.marqueeDistance
          if (crentleft < maxscrollwidth) { // 判断是否滚动到最大宽度
            that.marqueeDistance = crentleft + that.marqueePace
          } else {
            that.marqueeDistance = 0 // 直接重新滚动

            clearInterval(interval)
            that.scrolltxt()
          }
        }, that.interval)
      } else {
        that.marquee_margin = '1000' // 只显示一条不滚动右边间距加大，防止重复显示
      }
    },

    // 获取全部轮播图 接口
    getSwiperFun () {
      let _this = this
      getSwiper('swiper/getSwiper').then(res => {
        if (res.data.data) {
          _this.swiperList = res.data.data
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 获取全部公告 接口
    getNoticeFun () {
      let _this = this
      getNotice('notice/getNotice').then(res => {
        if (res.data.data) {
          _this.pageNotice = res.data.data[1]
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 获取精选商品 接口
    queryHotGoodsFun () {
      let _this = this
      let data = {
        isHot: '1'
      }
      queryHotGoods('goods/queryHotGoods', data).then(res => {
        if (res.data.data) {
          _this.hotGoods = changeQuerystring(res.data.data)
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 返回顶部
    fatherMethod (e) { // 一键回到顶部=
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    },
    // 跳转至商品详情页面
    toDetails (item) {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: `/pages/goodsDetails/main?id=${ENCODE(item.id)}`,
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    // 跳转至搜索页面
    toSearch () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: '/pages/search/main',
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    // 预览轮播图
    viewSwiper (index) {
      let swiperList = []
      for (let i = 0; i < this.swiperList.length; i++) {
        swiperList.push(this.swiperList[i].url)
      }
      wx.previewImage({
        current: swiperList[index],
        urls: swiperList
      })
    },
    // 分类跳转
    toCattle () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: '/pages/cattle/main',
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    toSheep () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: '/pages/sheep/main',
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    toChicken () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: '/pages/chicken/main',
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    toOther () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: '/pages/other/main',
        success: function (res) {
          wx.hideToast()
        }
      })
    }
  }
}
</script>

<style scoped>
.notice-box {
  background-color: #fff;
  width: 100%;
  height: 80rpx;
}
.notice-box .notice {
  width: 90%;
  height: 60rpx;
  margin: 10rpx auto;
  border-radius: 46rpx;
  display: flex;
  align-items: center;
  box-shadow: darkgrey 0 0 30rpx -10rpx;
}
.notice-box .notice .notice-view {
  width: 90%;
  height: 100%;
  overflow: hidden;
}
.notice-box .notice .message-title {
  width: 100%;
  height: 100%;
  font-size: 25rpx;
  line-height: 60rpx;
  padding-left: 60rpx;
}
.notice-box .notice i {
  padding-left: 10rpx;
  font-size: 50rpx;
  color: red;
}
.notice-box .notice p {
  padding-left: 10rpx;
  font-size: 12px;
  color: #666;
}
.search-box {
  background-color: #00bf6f;
  width: 100%;
  height: 100rpx;
  border-top: 2rpx solid #00bf6f;
  border-bottom: 2rpx solid #f4f4f4;
  position: fixed;
  top: 0;
  z-index: 99;
}
.search-box .search {
  background-color: #fff;
  width: 680rpx;
  height: 60rpx;
  margin: 20rpx auto;
  border-radius: 5rpx;
  display: flex;
  align-items: center;
}
.search-box .search i {
  padding-left: 10rpx;
  font-size: 18px;
}
.search-box .search p {
  padding-left: 10rpx;
  font-size: 12px;
  color: #666;
}
.swiper-box {
  /* background: linear-gradient(to bottom, #00bf6f, #fff); */
  background: -webkit-gradient(linear, 0 0, 0 60%, from(#00bf6f), to(#fff));
  padding: 20rpx 0;
  margin-top: 102rpx;
}
.swiper {
  width: 680rpx;
  height: 340rpx;
  margin: 0 auto;
  border-radius: 16rpx;
  overflow: hidden;
  transform: translateY(0);
}
.swiper image {
  width: 100%;
  height: 340rpx;
}

.classification {
  background-color: #fff;
  width: 680rpx;
  height: 200rpx;
  margin: 0 auto;
  border-radius: 5rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.classification div {
  width: 160rpx;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.classification div image {
  width: 80rpx;
  display: block;
  margin-bottom: 20rpx;
}
.hot-goods-box {
  width: 100%;
  height: auto;
  border-top: 6rpx solid #f4f4f4;
}
.hot-goods-box .hot-goods-title {
  width: auto;
  height: auto;
  display: flex;
  padding: 40rpx;
  align-items: center;
}
.hot-goods-box .hot-goods-title h2 {
  font-size: 18px;
}
.hot-goods-box .hot-goods-title i {
  padding-left: 20rpx;
  color: red;
}
.hot-goods-box .hot-goods {
  width: 700rpx;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin: 0 auto;
}
.hot-goods-box .hot-goods .hot-goods-div {
  width: 340rpx;
  height: 400rpx;
  border-radius: 8rpx;
  margin: 0 10rpx 10rpx 0;
  box-shadow: darkgrey 0 0 30rpx -10rpx;
  position: relative;
}
.hot-goods-box .hot-goods .hot-goods-div .yishouqing {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  text-align: center;
  color: #fff;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hot-goods-box .hot-goods .hot-goods-div image {
  width: 100%;
  height: 70%;
  border-top-left-radius: 8rpx;
  border-top-right-radius: 8rpx;
}
.hot-goods-box .hot-goods .hot-goods-div p {
  font-size: 16px;
  font-weight: 600;
  padding-left: 20rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.hot-goods-box .hot-goods .hot-goods-div .price {
  font-size: 20px;
  padding-left: 20rpx;
  font-weight: 600;
  color: #ff5f5f;
}
.hot-goods-box .hot-goods .hot-goods-div .price-sign {
  font-size: 14px;
  color: #ff5f5f;
}
</style>
