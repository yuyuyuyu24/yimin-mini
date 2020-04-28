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
    <div
      class="notice-box"
      @click="openNotice"
      v-if="pageNoticeShow"
    >
      <van-notice-bar
        custom-class="vant-notice"
        speed="10"
        left-icon="http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GDg.tWbg3heEIAi3S2J8Y1PSm9UA3CIWa9ro4.gm6xqE6mUtdsbRk5yu0wjki9D*gSK9VY2qsX2JYzeq4gSZCNE!/b&bo=IAAgACAAIAADFzI!&rf=viewer_4&t=5"
        :text="pageNotice.noticeContent"
      />
      <!-- <div class="notice">
        <i class="iconfont icongonggao"></i>
        <div class="notice-view">
          <view
            class="message-title"
            :animation="animationData"
            :style="{'transform': 'translateX('+-marqueeDistance+'px)','width':length+'px'}"
          >
            {{pageNotice.noticeContent}}
          </view>
        </div>
      </div> -->
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
      <div @click="toAll">
        <image
          mode='widthFix'
          src="../../static/images/all.png"
        ></image>
        全部商品
      </div>
      <div @click="toSpecial">
        <image
          mode='widthFix'
          src="../../static/images/special.png"
        ></image>
        特价商品
      </div>
      <div @click="toHot">
        <image
          mode='widthFix'
          src="../../static/images/hot.png"
        ></image>
        精选商品
      </div>
      <div @click="toNew">
        <image
          mode='widthFix'
          src="../../static/images/new.png"
        ></image>
        新品专区
      </div>
    </div>
    <div
      class="goodsTab"
      :class="{isFixedClass:isFixed}"
    >

      <div
        v-for="(item,index) in tabsList"
        :key="index"
        @click='checkCurrent(index)'
        :class="[ item.class,{'selected':index === currentData  }]"
      >
        <h3>{{item.title}}</h3>
        <p>
          {{item.content}}
        </p>
      </div>
    </div>
    <div
      class="
        goodsTab-box"
      :class="{isFixedClassGoodsTab:isFixed}"
    >
      <all-tabs
        :allGood=allGood
        v-if="currentData === 0 && allGood.length>0"
      />
      <special-tabs
        :specialGood=specialGood
        v-else-if="currentData === 1 && specialGood.length>0"
      />
      <hot-tabs
        :hotGood=hotGood
        v-else-if="currentData === 2 && hotGood.length>0"
      />
      <new-tabs
        :newGood=newGood
        v-else-if="currentData === 3 && newGood.length>0"
      />
    </div>
    <van-dialog id="van-dialog" />

  </div>
</template>

<script>
import { changeQuerystring } from '@/utils/function'
import { miniGetGoods, queryHotGoods, querySpecialGoods, miniGetNewsGoods } from '@/api/goods'

import backTop from '@/components/backTop'
import allTabs from '@/components/allTabs'
import specialTabs from '@/components/specialTabs'
import hotTabs from '@/components/hotTabs'
import newTabs from '@/components/newTabs'

// 导入精选商品数据
import { getSwiper } from '@/api/swiper'
import { getNotice } from '@/api/notice'

import Dialog from '../../../static/vant/dist/dialog/dialog'

export default {
  data () {
    return {
      isBack: false,
      swiperList: [],
      pageNotice: {},
      size: 12,
      interval: 100,
      length: '',
      windowWidth: '',
      isFixed: false,
      currentData: 0,
      tabsList: [
        { 'title': '全部商品', 'content': '超值好货', 'tabs': 0, 'class': 'goodsTab-all' },
        { 'title': '特价商品', 'content': '低价抢购', 'tabs': 1, 'class': 'goodsTab-special' },
        { 'title': '精选商品', 'content': '好物放心购', 'tabs': 2, 'class': 'goodsTab-hot' },
        { 'title': '新品专区', 'content': '春季上新', 'tabs': 3, 'class': 'goodsTab-new' }
      ],
      pageNoticeShow: true,
      allGood: [],
      hotGood: [],
      specialGood: [],
      newGood: [],
      conut: 0
    }
  },
  components: {
    backTop,
    allTabs,
    specialTabs,
    hotTabs,
    newTabs
  },
  // 页面滚动 选项卡吸顶
  onPageScroll (e) {
    if (e.scrollTop >= 418) {
      this.isFixed = true
    } else {
      this.isFixed = false
    }
    if (e.scrollTop > this.GLOBAL.SCROLL_TOP) {
      this.isBack = true
    } else {
      this.isBack = false
    }
  },
  mounted () {
    this.getSwiperFun()
    this.getNoticeFun()
  },
  onShow () {
    this.conut = 0
    this.allGood = []
    this.hotGood = []
    this.specialGood = []
    this.newGood = []
    this.miniGetGoodsFun()
    this.querySpecialGoodsFun()
    this.queryHotGoodsFun()
    this.miniGetNewsGoodsFun()
  },
  methods: {
    // 打开滚动公告
    openNotice () {
      Dialog.alert({
        title: this.pageNotice.noticeTitle,
        message: this.pageNotice.noticeContent
      })
    },
    // 获取全部轮播图 接口
    getSwiperFun () {
      // let this = this
      getSwiper('swiper/getSwiper').then(res => {
        if (res.data.data) {
          this.swiperList = res.data.data
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
      getNotice('notice/getNotice').then(res => {
        if (res.data.data) {
          if (res.data.data[1].noticeStatus === 1) {
            this.pageNoticeShow = true
            this.pageNotice = res.data.data[1]
          } else {
            this.pageNoticeShow = false
          }
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 获取全部商品 接口
    miniGetGoodsFun () {
      // let this = this
      let data = {
        pageNumber: 1,
        pageSize: 5
      }
      wx.showLoading({
        title: '加载中'
      })
      // 获取全部商品 接口
      miniGetGoods('goods/miniGetGoods', data).then(res => {
        wx.hideLoading()
        if (res.data.data) {
          if (res.data.data.length === 0) {
            wx.showToast({
              title: '商品加载完毕！',
              icon: 'none',
              duration: 1000
            })
          }
          this.allGood = this.allGood.concat(changeQuerystring(res.data.data))
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 获取特价商品 接口
    querySpecialGoodsFun () {
      let data = {
        isSpecial: 1,
        pageNumber: 1,
        pageSize: 5
      }
      querySpecialGoods('goods/querySpecialGoods', data).then(res => {
        if (res.data.data) {
          if (res.data.data.length === 0) {
            wx.showToast({
              title: '商品加载完毕！',
              icon: 'none',
              duration: 1000
            })
          }
          this.specialGood = this.specialGood.concat(changeQuerystring(res.data.data))
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
      // let this = this
      let data = {
        isHot: '1',
        pageNumber: 1,
        pageSize: 5
      }
      queryHotGoods('goods/queryHotGoods', data).then(res => {
        if (res.data.data) {
          if (res.data.data.length === 0) {
            wx.showToast({
              title: '商品加载完毕！',
              icon: 'none',
              duration: 1000
            })
          }
          this.hotGood = this.hotGood.concat(changeQuerystring(res.data.data))
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 获取最新的10条商品 接口
    miniGetNewsGoodsFun () {
      wx.showLoading({
        title: '加载中'
      })
      miniGetNewsGoods('goods/miniGetNewsGoods').then(res => {
        wx.hideLoading()
        if (res.data.data) {
          this.newGood = changeQuerystring(res.data.data)
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
    },
    toAll () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: '/pages/all/main',
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    toSpecial () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: '/pages/special/main',
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    toHot () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: '/pages/hot/main',
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    toNew () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: '/pages/new/main',
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    checkCurrent (index) {
      this.currentData = index
    }
  }
}
</script>

<style scoped>
.notice-box {
  background-color: #00bf6f;
  width: 100%;
  height: 60rpx;
  margin-top: 102rpx;
}
.search-box {
  background-color: #00bf6f;
  width: 100%;
  height: 100rpx;
  border-top: 2rpx solid #00bf6f;
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
  /* background: -webkit-gradient(linear, 0 0, 0 60%, from(#00bf6f), to(#fff)); */
  background-color: #00bf6f;
  padding: 20rpx 0 140rpx 0;
  border-bottom-left-radius: 70rpx;
  border-bottom-right-radius: 70rpx;
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
  height: 350rpx;
  margin: 0 auto;
  border-radius: 13rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -113rpx;
  box-shadow: darkgrey 0 0 30rpx -10rpx;
  flex-wrap: wrap;
}
.classification div {
  width: 160rpx;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.classification div image {
  width: 65rpx;
  display: block;
  margin-bottom: 15rpx;
}
.goodsTab {
  width: 100%;
  height: 100rpx;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40rpx;
  z-index: 99;
}
.goodsTab .selected h3 {
  color: #00bf6f !important;
}
.isFixedClass {
  position: fixed;
  top: 63rpx;
  background-color: #fff;
}
.isFixedClassGoodsTab {
  margin-top: 180rpx;
}
.goodsTab .goodsTab-all,
.goodsTab-special,
.goodsTab-hot,
.goodsTab-new {
  width: 25%;
  text-align: center;
}
.goodsTab .goodsTab-all h3,
.goodsTab-special h3,
.goodsTab-hot h3,
.goodsTab-new h3 {
  font-size: 15px;
  font-weight: 600;
  color: #000;
}
.goodsTab .goodsTab-all p,
.goodsTab-special p,
.goodsTab-hot p,
.goodsTab-new p {
  font-size: 12px;
  color: #666;
}
.goodsTab .goodsTab-all,
.goodsTab-special,
.goodsTab-hot {
  border-right: 1px solid #ccc;
}
.goodsTab-box {
  width: 100%;
}
</style>
