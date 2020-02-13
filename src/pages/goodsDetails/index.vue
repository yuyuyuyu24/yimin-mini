<template>
  <div class="goods-details-page">
    <back-top v-if="isBack"></back-top>
    <div class="swiper-box">
      <swiper  class="swiper"
      indicator-dots=true
      autoplay=true interval=5000>
          <swiper-item v-for="(item,index) in hotGoodsList.imgUrlList" :key=index @click="viewSwiper(index)">
              <view>
                <image lazy-load=true mode="aspectFit" :src="item"></image>
              </view>
          </swiper-item>
      </swiper>
    </div>
    <div class="details">
      <p>{{hotGoodsList.title}}</p>
      <view>
        <span class="price">
          <span class="price-sign">￥</span>{{hotGoodsList.price}}<span class="price-unit">/500克</span>
        </span>
        <i class="iconfont iconwenhao" @click="tip"></i>
      </view>
    </div>
    <div :class="[hotGoodsList.isVideos ? 'store-message' : 'store-videos']">
      <p>商家留言</p>
      <span>{{hotGoodsList.content}}</span>
    </div>
    <div class="store-videos" v-if="hotGoodsList.isVideos">
      <p>商品视频</p>
      <div class="store-videos-video">
        <view>
        <video :src="hotGoodsList.videoUrl"></video>
        </view>
      </div>
    </div>
    <div class="share">
      <button open-type="share">分享给好友</button>
    </div>
  </div>
</template>

<script>
import backTop from '@/components/backTop'
// 导入全部数据
import data from '@/utils/data.js'
export default {
  data () {
    return {
      hotGoods: data.allData,
      hotGoodsList: {},
      isBack: false
    }
  },
  components: {
    backTop
  },
  mounted () {
    let query = this.$root.$mp.query.id
    let obj = this.hotGoods.find(function (e) {
      return e.id === Number(query)
    })
    this.hotGoodsList = obj
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
      let that = this
      wx.previewImage({
        current: that.hotGoodsList.imgUrlList[index],
        urls: that.hotGoodsList.imgUrlList
      })
    },
    // 提示
    tip () {
      wx.showModal({
        title: '提示',
        content: '价钱xxxxxx',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  // 分享
  onShareAppMessage (res) {
    let that = this
    return {
      title: that.hotGoodsList.title,
      path: `/pages/goodsDetails/main?id=${that.$root.$mp.query.id}`,
      imageUrl: that.hotGoodsList.imgUrlList[0]
    }
  }

}
</script>

<style scoped>
.goods-details-page {
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
  padding: 40rpx 0;
  text-align: center;
}
.store-message span {
  font-size: 16px;
  margin: 0 20rpx;
  display: block;
  text-indent: 32px;
  padding: 20rpx 0;
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
  padding: 40rpx 0;
  text-align: center;
}
.store-videos span {
  font-size: 16px;
  margin: 0 20rpx;
  display: block;
  text-indent: 32px;
  padding: 20rpx 0;
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
  background-color: #ff5f69;
  color: #fff;
  border-radius: 0;
}
</style>
