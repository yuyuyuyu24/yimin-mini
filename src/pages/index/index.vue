<template>
  <div class="page">
    <back-top v-if="isBack"></back-top>
    <div class="search-box" @click="toSearch">
      <div class="search">
        <i class="iconfont iconsousuo-copy"></i>
        <p>搜索你想要的商品...</p>
      </div>
    </div>
    <div class="swiper-box">
      <swiper  class="swiper"
      indicator-dots=true
      autoplay=true
      interval=5000
      >
          <swiper-item v-for="(item,index) in swiperList" :key=index  @click="viewSwiper(index)">
              <view>
                <image lazy-load=true mode="widthFile" :src="item"></image>
              </view>
          </swiper-item>
      </swiper>
    </div>
    <div class="classification">
      <div @click="toCattle">
         <image mode='widthFix' src="../../static/images/cattle.png"></image>
        牛肉
      </div>
      <div @click="toSheep">
         <image mode='widthFix' src="../../static/images/sheep.png"></image>
        羊肉
      </div>
      <div @click="toChicken">
         <image mode='widthFix' src="../../static/images/chicken.png"></image>
        部位鸡
      </div>
      <div @click="toOther">
         <image mode='widthFix' src="../../static/images/other.png"></image>
        其他
      </div>
    </div>
    <div class="hot-goods-box">
      <h2>精选商品</h2>
      <div class="hot-goods">
        <div v-for="(item,index) in hotGoods" :key="index" @click="toDetails(item)">
          <image lazy-load=true mode="widthFile" :src='item.imgUrl'></image>
          <p>{{item.title}}</p>
            <span class="price">
              <span class="price-sign">￥</span>{{item.price}}
            </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backTop from '@/components/backTop'
// 导入精选商品数据
import data from '@/utils/data.js'
export default {
  data () {
    return {
      hotGoods: data.hotGoodsData,
      isBack: false,
      swiperList: data.swiperData
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

  methods: {
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
        url: `/pages/goodsDetails/main?id=${item.id}`,
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
      wx.previewImage({
        current: data.swiperData[index],
        urls: data.swiperData
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
.swiper {
  width: 680rpx;
  height: 340rpx;
  margin: 20rpx auto;
  border-radius: 16rpx;
  overflow: hidden;
  transform: translateY(0);
}
.swiper image {
  width: 100%;
  height: 340rpx;
}
.search-box {
  background-color: #fff;
  width: 100%;
  height: 100rpx;
  border-top: 2rpx solid #f4f4f4;
  border-bottom: 2rpx solid #f4f4f4;
}
.search-box .search {
  background-color: #f6f6f6;
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
.hot-goods-box h2 {
  font-size: 18px;
  padding: 40rpx;
}
.hot-goods-box .hot-goods {
  width: 700rpx;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin: 0 auto;
}
.hot-goods-box .hot-goods div {
  width: 340rpx;
  height: 400rpx;
  border-radius: 8rpx;
  margin: 0 10rpx 10rpx 0;
  box-shadow: darkgrey 0 0 30rpx -10rpx;
}
.hot-goods-box .hot-goods div image {
  width: 100%;
  height: 70%;
  border-top-left-radius: 8rpx;
  border-top-right-radius: 8rpx;
}
.hot-goods-box .hot-goods div p {
  font-size: 16px;
  font-weight: 600;
  padding-left: 20rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.hot-goods-box .hot-goods div .price {
  font-size: 20px;
  padding-left: 20rpx;
  font-weight: 600;
  color: #ff5f5f;
}
.hot-goods-box .hot-goods div .price-sign {
  font-size: 14px;
  color: #ff5f5f;
}
</style>
