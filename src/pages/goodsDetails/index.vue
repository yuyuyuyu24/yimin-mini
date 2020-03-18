<template>
  <div class="goods-details-page">
    <back-top v-if="false"></back-top>
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
      <div class="collection-iconfont">
        <i class="iconfont iconlianxikefu"></i>
      </div>
    </div>
    <div class="details">
      <view>
        <span class="price">
          <span class="price-sign">￥</span>{{hotGoodsList.goodsPrice}}
          <span class="price-unit"></span>
        </span>
        <span class="stock-before-price">
          <span
            v-if="hotGoodsList.isSpecial === 1"
            class="before-price"
          >￥{{hotGoodsList.beforeGoodsPrice}}</span>
          <span class="stock">库存：500</span>
        </span>
      </view>
    </div>
    <div>
    </div>
    <div class="store-message">
      <p>{{hotGoodsList.goodsName}} {{hotGoodsList.goodsUnit}}</p>
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
    <div class="bottom-nav">
      <div class="bottom-nav-iconfont">
        <div @click="commentFun">
          <i class="iconfont iconpinglun"></i>
          评论
        </div>
        <div @click="collection">
          <i
            v-if="isCollection"
            class="iconfont iconshoucang1"
          ></i>
          <i
            v-if="!isCollection"
            class="iconfont iconshoucang"
          ></i>
          收藏
        </div>
        <div>
          <button open-type="share">
            <i class="iconfont iconshare"></i>
            分享
          </button>
        </div>
      </div>
      <div class="bottom-nav-button">
        <div
          class="add-to-cart"
          @click="addtocartFun"
        >加入购物车</div>
        <div
          class="order-now"
          @click="ordernowFun"
        >立即购买</div>
      </div>
    </div>
    <van-popup
      :show="isComment"
      closeable
      position="bottom"
      custom-style="height: 70%"
      @close="onCloseComment"
      round
    >
      <div class="comment">
        <span class="comment-title">评论 ( 0 )</span>
        <div class="comment-content">
          <div
            class="comment-null"
            v-if="isCommentNum"
          >
            <i class="iconfont iconno_result"></i>
            暂时还没有商品评论，快去购买商品后评论吧！
          </div>
          <div
            class="comment-content-box"
            v-if="!isCommentNum"
          >
            <div class="comment-content-box-top">
              <img />
              <div class="comment-content-box-top-right">
                <p>爱24真的是太好了</p>
                <span>2019.10.21</span>
              </div>
            </div>
            <div class="comment-content-box-bottom">
              真的好！真的好！真的好！真的好！真的好！真的好！
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <van-toast id="van-toast" />
    <add-to-cart ref="addtocart"></add-to-cart>
    <order-now ref="ordernow"></order-now>
  </div>
</template>

<script>
import backTop from '@/components/backTop'
import { getGoodsDetail } from '@/api/goods'
import { UNENCODE, changeQuerystringDetail } from '@/utils/function'
import Toast from '../../../static/vant/dist/toast/toast'
import addToCart from '@/components/goodsDetail/addToCart'
import orderNow from '@/components/goodsDetail/orderNow'
export default {
  data () {
    return {
      hotGoodsList: {},
      isBack: false,
      isCollection: true,
      isComment: false,
      isCommentNum: true
    }
  },
  components: {
    backTop,
    addToCart,
    orderNow
  },
  mounted () {
    let id = UNENCODE(this.$root.$mp.query.id)
    this.getGoodsDetailFun({ id })
    // 页面打开时调用子组件的关闭加入购物车 立即购买 组件方法
    this.$refs.addtocart.onClose()
    this.$refs.ordernow.onClose()
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
    // 收藏
    collection () {
      this.isCollection = !this.isCollection
      Toast.success('收藏成功')
      // Toast.fail('失败文案')
    },
    // 打开评论
    commentFun () {
      this.isComment = true
    },
    // 关闭评论
    onCloseComment () {
      this.isComment = false
    },
    // 加入购物车 并把值传给子组件
    addtocartFun () {
      if (this.hotGoodsList.goodsStatus === 2) {
        wx.showToast({
          title: '抱歉，该商品暂时没有货啦，具体到货日期可咨询商家。',
          icon: 'none',
          duration: 4000
        })
      } else if (this.hotGoodsList.goodsStatus === 1) {
        let data = {
          hotGoodsList: this.hotGoodsList,
          isAddToCart: true
        }
        this.$refs.addtocart.$emit('addToCartMethod', data)
      }
    },
    // 立即购买
    ordernowFun () {
      if (this.hotGoodsList.goodsStatus === 2) {
        wx.showToast({
          title: '抱歉，该商品暂时没有货啦，具体到货日期可咨询商家。',
          icon: 'none',
          duration: 4000
        })
      } else if (this.hotGoodsList.goodsStatus === 1) {
        let data = {
          hotGoodsList: this.hotGoodsList,
          isOrderNow: true
        }
        this.$refs.ordernow.$emit('ordernowMethod', data)
      }
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
  },
  onHide () {
    console.log('121212')
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
  position: relative;
}
.swiper-box .swiper {
  width: 100%;
  height: 700rpx;
}
.swiper-box .swiper image {
  width: 100%;
  height: 700rpx;
}
.swiper-box .collection-iconfont {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #ddd;
  position: absolute;
  right: 40rpx;
  top: 40rpx;
  text-align: center;
  line-height: 60rpx;
}
.swiper-box .collection-iconfont i {
  color: #000;
  font-size: 20px;
  font-weight: 600;
}
.details {
  width: auto;
  height: 130rpx;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  background: url("http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GB2CP3utt1KPLGkcXJkfXfRtdTifa3XqQQLyRyeiCUeL05CISxCOzVuKWNM4I5bW64o2r5d*Z9EAxMxqzzsvUBY!/b&bo=owJpAKMCaQADFzI!&rf=viewer_4&t=5")
    no-repeat;
  background-size: 100% 100%;
  padding: 0 20rpx;
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
  font-size: 17px;
}
.details .stock-before-price {
  display: flex;
  flex-direction: column;
  margin-left: 16rpx;
}
.details .stock-before-price .before-price {
  color: #fff;
  text-decoration: line-through;
}
.details .stock-before-price .stock {
  color: #fff;
}
.details .price {
  font-size: 40px;
  color: #fff;
  font-weight: 500;
}
.details .price-sign {
  font-size: 22px;
  font-weight: 400;
}
.details .price-unit {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}
.store-message {
  background-color: #fff;
  width: 100%;
  height: auto;
}
.store-message p {
  font-size: 18px;
  padding: 20rpx 40rpx;
}
.store-message span {
  font-size: 16px;
  margin: 0 20rpx;
  display: block;
  padding: 0rpx 0 40rpx 20rpx;
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
.bottom-nav {
  width: 100%;
  height: 120rpx;
  position: fixed;
  bottom: 0;
  border-top: 4rpx solid #f4f4f4;
  background-color: #fff;
  display: flex;
}
.bottom-nav .bottom-nav-iconfont {
  width: 50%;
  height: 100%;
  display: flex;
}
.bottom-nav .bottom-nav-iconfont div {
  width: calc(100% / 3);
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
.bottom-nav .bottom-nav-iconfont div i {
  font-size: 18px;
}
.bottom-nav .bottom-nav-iconfont div button {
  font-size: 14px;
}
.bottom-nav .bottom-nav-iconfont div .iconshoucang1 {
  color: #000;
}
.bottom-nav .bottom-nav-iconfont div .iconshoucang {
  color: red;
}
.bottom-nav .bottom-nav-button {
  width: 50%;
  height: 100%;
  display: flex;
}
.bottom-nav .bottom-nav-button div {
  width: 50%;
  height: 100%;
  color: #fff;
  text-align: center;
  line-height: 120rpx;
  font-size: 14px;
}
.bottom-nav .bottom-nav-button .add-to-cart {
  background-color: #3fe2b3;
}
.bottom-nav .bottom-nav-button .order-now {
  background-color: #0ac775;
}
/* .share button {
  width: 100%;
  height: 100rpx;
  text-align: center;
  line-height: 100rpx;
  background-color: #67c23a;
  color: #fff;
  border-radius: 0;
} */
.comment {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.comment .comment-title {
  font-size: 20px;
  line-height: 100rpx;
}
.comment .comment-content {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.comment .comment-null {
  width: 100%;
  margin: 100rpx 0;
  text-align: center;
}
.comment .comment-null i {
  font-size: 40px;
  padding-bottom: 40rpx;
}
.comment .comment-content-box {
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 40rpx;
  align-items: center;
}
.comment .comment-content-box .comment-content-box-top {
  width: 100%;
  height: 50%;
  display: flex;
}
.comment
  .comment-content-box
  .comment-content-box-top
  .comment-content-box-top-right {
  width: auto;
  display: flex;
  flex-direction: column;
  margin-left: 40rpx;
  justify-content: space-between;
}
.comment
  .comment-content-box
  .comment-content-box-top
  .comment-content-box-top-right
  p {
  font-weight: 600;
}
.comment
  .comment-content-box
  .comment-content-box-top
  .comment-content-box-top-right
  span {
  font-size: 14px;
  color: #888;
}
.comment .comment-content-box .comment-content-box-top img {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  border: 1px solid #ccc;
}
.comment .comment-content-box .comment-content-box-bottom {
  margin-top: 20rpx;
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
