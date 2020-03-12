<template>
  <div class="goods-details-page">
    <back-top v-if="isBack"></back-top>
    <div class="swiper-box">
      <swiper
        class="swiper"
        indicator-dots=true
        autoplay=true
        interval=5000
      >
        <swiper-item
          v-for="(item,index) in hotGoodsList.swiperList"
          :key=index
          @click="viewSwiper(index)"
        >
          <view>
            <image
              lazy-load=true
              mode="aspectFit"
              :src="item.url"
            ></image>
          </view>
        </swiper-item>
      </swiper>
    </div>
    <div class="details">
      <p>{{hotGoodsList.goodsName}}</p>
      <view>
        <span class="price">
          <span class="price-sign">￥</span>{{hotGoodsList.goodsPrice}}
          <span class="price-unit">/ {{hotGoodsList.goodsUnit}}</span>

        </span>
        <i
          class="iconfont iconwenhao"
          @click="tip"
        ></i>
      </view>
    </div>
    <div :class="[hotGoodsList.isVideos ? 'store-message' : 'store-videos']">
      <p>商家留言</p>
      <span>{{hotGoodsList.goodsInfo}}</span>
    </div>
    <div
      class="store-videos"
      v-if="hotGoodsList.isVideos"
    >
      <p>商品视频</p>
      <div class="store-videos-video">
        <view>
          <video
            muted=true
            :src="hotGoodsList.videoList[0].url"
          ></video>
        </view>
      </div>
    </div>
    <div class="share">
      <button open-type="share">分享给好友
      </button>
    </div>
  </div>
</template>

<script>
import backTop from '@/components/backTop'
import { getGoodsDetail } from '@/api/goods'
import { UNENCODE, changeQuerystringDetail } from '@/utils/function'
export default {
  data () {
    return {
      hotGoodsList: {},
      isBack: false
    }
  },
  components: {
    backTop
  },
  mounted () {
    let id = UNENCODE(this.$root.$mp.query.id)
    this.getGoodsDetailFun({ id })
  },

  onPageScroll (e) {
    if (e.scrollTop > this.GLOBAL.SCROLL_TOP) {
      this.isBack = true
    } else {
      this.isBack = false
    }
  },

  methods: {
    // 获取商品详情接口
    getGoodsDetailFun (id) {
      let _this = this
      wx.showLoading({
        title: '加载中'
      })
      getGoodsDetail('goods/getGoodsDetail', id).then(res => {
        wx.hideLoading()
        if (res.data.data) {
          _this.hotGoodsList = changeQuerystringDetail(res.data.data)
          console.log(_this.hotGoodsList)
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
    fatherMethod (e) { // 一键回到顶部
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
    // 预览轮播图
    viewSwiper (index) {
      let _this = this
      let swiperList = []
      for (let i = 0; i < _this.hotGoodsList.swiperList.length; i++) {
        swiperList.push(_this.hotGoodsList.swiperList[i].url)
      }
      wx.previewImage({
        current: swiperList[index],
        urls: swiperList
      })
    },
    // 提示
    tip () {
      wx.showModal({
        title: '提示',
        content: '近期肉类价格波动频繁，实际价格以咨询店主为准。'
      })
    }
  },
  // 分享
  onShareAppMessage (res) {
    let that = this
    return {
      title: that.hotGoodsList.title,
      path: `/pages/goodsDetails/main?id=${UNENCODE(that.$root.$mp.query.id)}`,
      imageUrl: that.hotGoodsList.swiperList[0].url
    }
  }

}
</script>

<style scoped>
.goods-details-page {
  height: 100%;
  background-color: #f4f4f4;
}
.swiper-box {
  width: 100%;
  height: 700rpx;
  background-color: #fff;
}
.swiper-box .swiper {
  width: 100%;
  height: 700rpx;
}
.swiper-box .swiper image {
  width: 100%;
  height: 700rpx;
}
.details {
  width: 100%;
  height: 180rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
}
.details view {
  display: flex;
  align-items: center;
}
.details view .iconwenhao {
  font-size: 32rpx;
  color: #333;
  padding-top: 10rpx;
  padding-left: 10rpx;
}
.details p {
  font-size: 24px;
  padding-bottom: 20rpx;
}
.details .price {
  font-size: 20px;
  color: #ff5f5f;
  font-weight: 600;
}
.details .price-sign {
  font-size: 16px;
}
.details .price-unit {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}
.store-message {
  margin-top: 40rpx;
  background-color: #fff;
  width: 100%;
  height: auto;
}
.store-message p {
  font-size: 18px;
  padding: 35rpx 0;
  text-align: center;
}
.store-message span {
  font-size: 16px;
  margin: 0 20rpx;
  display: block;
  text-indent: 32px;
  padding: 0rpx 0 40rpx 0;
  line-height: 50rpx;
  color: #666;
}
.store-videos {
  margin-top: 40rpx;
  background-color: #fff;
  width: 100%;
  height: auto;
  margin-bottom: 120rpx;
}
.store-videos p {
  font-size: 18px;
  padding: 35rpx 0;
  text-align: center;
}
.store-videos span {
  font-size: 16px;
  margin: 0 20rpx;
  display: block;
  text-indent: 32px;
  padding: 0rpx 0 40rpx 0;
  line-height: 50rpx;
  color: #666;
}
.store-videos .store-videos-video {
  width: 710rpx;
  height: auto;
  margin: 0 auto;
}
.store-videos .store-videos-video video {
  width: 100%;
}
.share {
  width: 100%;
  height: 100rpx;
  position: fixed;
  bottom: 0;
}
.share button {
  width: 100%;
  height: 100rpx;
  text-align: center;
  line-height: 100rpx;
  background-color: #67c23a;
  color: #fff;
  border-radius: 0;
}
</style>
