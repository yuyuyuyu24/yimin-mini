<template>
  <van-skeleton
    title
    avatar
    avatar-shape="square"
    row="3"
    :loading="skeletonLoading"
    class="van-skeleton-goods"
  >
    <div class="goods-details-page">
      <back-top v-if="false"></back-top>
      <div class="swiper-box">
        <swiper class="swiper" autoplay="true" interval="5000">
          <swiper-item
            v-for="(item,index) in hotGoodsList.swiperList"
            :key="index"
            @click="viewSwiper(index)"
          >
            <view>
              <div
                class="bg"
                :style="{
                  background: 'url('+item.url+') no-repeat center/cover'
                }"
              ></div>
            </view>
          </swiper-item>
        </swiper>
        <button class="collection-iconfont" open-type="contact">
          <i class="iconfont iconlianxikefu"></i>
        </button>
      </div>
      <div class="store-message">
        <h3>{{hotGoodsList.goodsName}}</h3>
        <div class="price">
          <p class="price-sign">￥</p>
          <p class="price-num">{{hotGoodsList.goodsPrice}}</p>
          <p
            v-if="hotGoodsList.isSpecial === 1"
            class="before-price"
          >￥{{hotGoodsList.beforeGoodsPrice}}</p>
        </div>
        <span class="stock">库存：{{hotGoodsList.goodsStock}}</span>
      </div>
      <div class="store-parameter">
        <h3>商品参数</h3>
        <div>
          <span>商品简介</span>
          <p>{{hotGoodsList.goodsInfo}}</p>
        </div>
        <div>
          <span>商品规格</span>
          <p>{{hotGoodsList.goodsUnit}}</p>
        </div>
      </div>
      <div class="store-videos" v-if="hotGoodsList.isVideos">
        <p>商品实拍</p>
        <div class="store-videos-video">
          <view>
            <video muted="true" :src="hotGoodsList.videoList[0].url"></video>
          </view>
        </div>
      </div>
      <div class="bottom-nav">
        <div class="bottom-nav-iconfont">
          <div @click="commentFun">
            <i class="iconfont iconpinglun"></i>
            评论
          </div>
          <div @click="collection()">
            <i v-if="isCollection" class="iconfont iconshoucang1"></i>
            <i v-if="!isCollection" class="iconfont iconshoucang"></i>
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
          <div class="add-to-cart" @click="addtocartFun">加入购物车</div>
          <div class="order-now" @click="ordernowFun">立即购买</div>
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
          <span class="comment-title">评论 ( {{commentsList.length}} )</span>
          <div class="comment-content">
            <div class="comment-null" v-if="commentsList.length === 0">
              <i class="iconfont iconno_result"></i>
              暂时还没有商品评论，快去购买商品后评论吧！
            </div>
            <div v-if="commentsList.length > 0">
              <div class="comment-content-box" v-for="(item,index) in commentsList" :key="index">
                <div class="comment-content-box-top">
                  <img :src="item.userImg" />
                  <div class="comment-content-box-top-right">
                    <p>{{item.userName}}</p>
                    <span>{{item.createTime}}</span>
                  </div>
                </div>
                <div class="comment-content-box-bottom">{{item.comment}}</div>
              </div>
            </div>
          </div>
        </div>
      </van-popup>
      <van-toast id="van-toast" />
      <add-to-cart ref="addtocart"></add-to-cart>
      <order-now ref="ordernow"></order-now>
      <van-dialog id="van-dialog" />
    </div>
  </van-skeleton>
</template>

<script>
import backTop from '@/components/backTop'
import { getGoodsDetail } from '@/api/goods'
import { toCollection, cancelCollection, searchCollection } from '@/api/collection'
import { getGoodsComment } from '@/api/comment'
import { UNENCODE, changeQuerystringDetail, formatDate } from '@/utils/function'
import { getAdminDetail } from '@/api/admin'
import Toast from '../../../static/vant/dist/toast/toast'
import addToCart from '@/components/goodsDetail/addToCart'
import orderNow from '@/components/goodsDetail/orderNow'
import Dialog from '../../../static/vant/dist/dialog/dialog'
export default {
  data () {
    return {
      hotGoodsList: {},
      isBack: false,
      isCollection: true,
      isComment: false,
      commentsList: [],
      skeletonLoading: true
    }
  },
  components: {
    backTop,
    addToCart,
    orderNow
  },
  mounted () {
    // 页面打开时调用子组件的关闭加入购物车 立即购买 组件方法
    this.$refs.addtocart.onClose()
    this.$refs.ordernow.onClose()
    let id = UNENCODE(this.$root.$mp.query.id)
    this.getGoodsDetailFun({ id })
  },
  onShow () {
  },
  onUnload () {
    this.hotGoodsList = {} // 清除数据
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
          _this.searchCollectionFun()
          this.skeletonLoading = false
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 收藏接口
    toCollectionFun (data) {
      let _this = this
      wx.showLoading({
        title: '加载中'
      })
      toCollection('mini/toCollection', data).then(res => {
        wx.hideLoading()
        if (res.data.data) {
          _this.isCollection = !_this.isCollection
          Toast.success('收藏成功')
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 取消收藏接口
    cancelCollectionFun (data) {
      let _this = this
      wx.showLoading({
        title: '加载中'
      })
      cancelCollection('mini/cancelCollection', data).then(res => {
        wx.hideLoading()
        if (res.data.data) {
          _this.isCollection = !_this.isCollection
          Toast.success('取消收藏成功')
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 根据用户id和商品id查找该条商品有没有收藏过
    searchCollectionFun (data) {
      let _this = this
      let value = wx.getStorageSync('userMegList')
      if (value) {
        let data = {
          userId: value.id,
          shopId: _this.hotGoodsList.id
        }
        wx.showLoading({
          title: '加载中'
        })
        searchCollection('mini/searchCollection', data).then(res => {
          wx.hideLoading()
          if (res.data.data) {
            _this.isCollection = false
          } else {
            _this.isCollection = true
          }
        }).catch(() => {
          wx.showToast({
            title: '网络出现问题，请稍后再试！',
            icon: 'none',
            duration: 2000
          })
        })
      }
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
      let _this = this
      wx.checkSession({
        success (res) {
          let value = wx.getStorageSync('userMegList')
          if (!value) {
            Dialog.alert({
              title: '提示',
              message: '很抱歉，您需要先进行登录才可以收藏商品哦 ~'
            }).then(() => {
              wx.navigateTo({
                url: `/pages/loginPage/main`
              })
            })
          } else {
            // session_key 未过期，并且在本生命周期一直有效
            let data = {
              userId: value.id,
              shopId: _this.hotGoodsList.id
            }
            if (_this.isCollection === false) {
              _this.cancelCollectionFun(data)
            } else {
              _this.toCollectionFun(data)
            }
          }
        },
        fail () {
          // session_key 已经失效，需要重新执行登录流程
          // wx.login() // 重新登录
          Dialog.alert({
            title: '提示',
            message: '很抱歉，您需要先进行登录才可以收藏商品哦 ~'
          }).then(() => {
            wx.navigateTo({
              url: `/pages/loginPage/main`
            })
          })
        }
      })
    },
    // 打开评论
    commentFun () {
      this.isComment = true
      let goodsId = UNENCODE(this.$root.$mp.query.id)
      this.getGoodsCommentFun({ goodsId })
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
      } else if (this.hotGoodsList.goodsStatus === 3) {
        wx.showToast({
          title: '抱歉，该商品暂时已被商家下架，具体上架日期可咨询商家。',
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
      let _this = this
      wx.checkSession({
        success (res) {
          let value = wx.getStorageSync('userMegList')
          if (!value) {
            Dialog.alert({
              title: '提示',
              message: '很抱歉，您需要先进行登录才可以购买商品哦 ~'
            }).then(() => {
              wx.navigateTo({
                url: `/pages/loginPage/main`
              })
            })
          } else {
            // session_key 未过期，并且在本生命周期一直有效
            let id = 1
            getAdminDetail('admin/getAdminDetail', { id }).then(res => {
              if (res.data.data) {
                if (res.data.data.business === '2') {
                  Dialog.alert({
                    title: '提示',
                    message: '抱歉，本店由于特殊原因暂时停止对外派送，恢复时间可查看小程序内公告或联系商家，感谢理解！'
                  })
                } else if (_this.hotGoodsList.goodsStatus === 2) {
                  wx.showToast({
                    title: '抱歉，该商品暂时没有货啦，具体到货日期可咨询商家。',
                    icon: 'none',
                    duration: 4000
                  })
                } else if (_this.hotGoodsList.goodsStatus === 3) {
                  wx.showToast({
                    title: '抱歉，该商品暂时已被商家下架，具体上架日期可咨询商家。',
                    icon: 'none',
                    duration: 4000
                  })
                } else if (_this.hotGoodsList.isFixed === 1) {
                  Dialog.alert({
                    title: '提示',
                    message: '抱歉，该商品是不定量商品。如您想要购买，请联系商家客服或拨打商家电话进行咨询，感谢理解！'
                  })
                } else if (_this.hotGoodsList.goodsStatus === 1) {
                  let data = {
                    hotGoodsList: _this.hotGoodsList,
                    isOrderNow: true
                  }
                  _this.$refs.ordernow.$emit('ordernowMethod', data)
                }
              }
            }).catch(() => {
              wx.showToast({
                title: '网络出现问题，请稍后再试！',
                icon: 'none',
                duration: 2000
              })
            })
          }
        },
        fail () {
          // session_key 已经失效，需要重新执行登录流程
          // wx.login() // 重新登录
          Dialog.alert({
            title: '提示',
            message: '很抱歉，您需要先进行登录才可以购买商品哦 ~'
          }).then(() => {
            wx.navigateTo({
              url: `/pages/loginPage/main`
            })
          })
        }
      })
    },
    // 获取评论接口
    getGoodsCommentFun (data) {
      let _this = this
      wx.showLoading({
        title: '加载中'
      })
      getGoodsComment('mini/getGoodsComment', data).then(res => {
        wx.hideLoading()
        if (res.data.data) {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].createTime = formatDate(Number(res.data.data[i].createTime))
          }
          _this.commentsList = res.data.data
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    }
  },
  // 分享
  onShareAppMessage (res) {
    let that = this
    return {
      title: that.hotGoodsList.goodsName,
      path: `/pages/goodsDetails/main?id=${that.$root.$mp.query.id}`,
      imageUrl: that.hotGoodsList.swiperList[0].url
    }
  }
}
</script>

<style lang="less" scoped>
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
.swiper-box .swiper .bg {
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
  color: #333;
  text-decoration: line-through;
}
.details .stock-before-price .stock {
  color: #333;
}
.details .price {
  font-size: 40px;
  color: #333;
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
  width: 100%;
  background: #fff;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 670rpx;
  border-radius: 32rpx 32rpx 0px 0px;
  h3 {
    font-size: 36rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 36rpx;
    margin: 30rpx 0 0 30rpx;
    display: flex;
    align-items: flex-end;
    p {
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 24rpx;
    }
  }
  .price {
    display: flex;
    align-items: flex-end;
    margin: 20rpx 0 0 30rpx;
    .price-sign {
      font-size: 24rpx;
      color: #ff5f5f;
    }
    .price-num {
      font-size: 36rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ff443d;
      line-height: 36rpx;
    }

    .before-price {
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 24rpx;
      text-decoration: line-through;
      margin-left: 8rpx;
    }
  }
  .stock {
    margin: 20rpx 0 20rpx 30rpx;
    font-size: 20rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 20rpx;
    display: block;
  }
}
.store-parameter {
  height: auto;
  background: #fff;
  padding-left: 30rpx;
  overflow: hidden;
  border-top: 16rpx solid #f7f8fa;
  padding-bottom: 16rpx;
  margin-top: 150rpx;
  h3 {
    font-size: 32rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 32rpx;
    margin-top: 30rpx;
  }
  div {
    margin-top: 20rpx;
    display: flex;
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 24rpx;
    p {
      width: 538rpx;
      margin-left: 40rpx;
    }
  }
}
.store-videos {
  background-color: #fff;
  width: 100%;
  height: auto;
  margin-bottom: 120rpx;
  border-top: 16rpx solid #f7f8fa;
}
.store-videos p {
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 32rpx;
  margin: 30rpx 0 20rpx 30rpx;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.comment .comment-title {
  font-size: 20px;
  line-height: 100rpx;
  width: 100%;
  text-align: center;
  background-color: #fff;
}
.comment .comment-content {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  overflow-y: scroll;
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
  align-items: start;
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
