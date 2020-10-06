<template>
  <div class="hot-goods-box">
    <div class="hot-goods">
      <div
        v-for="(item,index) in newGoods"
        :key="index"
        @click="toDetails(item)"
        class="hot-goods-div"
      >
        <div class="yishouqing" v-if="item.goodsStatus === 2">已 售 罄</div>
        <div
          class="bg"
          :style="{
                  background: 'url('+item.coverList.url+') no-repeat center/cover'
                }"
        ></div>
        <p>{{item.goodsName}}</p>
        <span class="price">
          <span class="price-sign">￥</span>
          {{item.goodsPrice}}
        </span>
        <div v-if="item.isSpecial === 1" class="hot-goods-div-message-right">特价</div>
      </div>
    </div>
  </div>
</template>
<script>
import { miniGetNewsGoods } from '@/api/goods'
import { changeQuerystring, ENCODE } from '@/utils/function'

export default {
  props: ['newGood'],
  data () {
    return {
      newGoods: []
    }
  },
  mounted () {
    this.newGoods = this.newGood
    // this.miniGetNewsGoodsFun()
  },
  methods: {
    // 获取最新的10条商品 接口
    miniGetNewsGoodsFun () {
      let _this = this
      wx.showLoading({
        title: '加载中'
      })
      miniGetNewsGoods('goods/miniGetNewsGoods').then(res => {
        wx.hideLoading()
        if (res.data.data) {
          _this.newGoods = changeQuerystring(res.data.data)
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
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
    }
  }

}
</script>
<style lang="less" scoped>
.hot-goods-box {
  width: 100%;
  height: auto;
  margin: 25rpx 0;
}
.hot-goods-box .hot-goods {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}
.hot-goods-box .hot-goods .hot-goods-div {
  width: 330rpx;
  border-radius: 6rpx;
  margin: 0 30rpx 30rpx 30rpx;
  box-shadow: darkgrey 0 0 30rpx -10rpx;
  position: relative;
}
.hot-goods-box .hot-goods .hot-goods-div:nth-child(even) {
  margin: 0 0 30rpx 0;
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
.hot-goods-box .hot-goods .hot-goods-div .bg {
  width: 100%;
  height: 260rpx;
  border-top-left-radius: 6rpx;
  border-top-right-radius: 6rpx;
}
.hot-goods-box .hot-goods-div-message-right {
  width: 80rpx;
  height: 60rpx;
  background-color: #b4db9a;
  color: #fff;
  text-align: center;
  line-height: 60rpx;
  border-radius: 15rpx;
  position: absolute;
  bottom: 37rpx;
  right: 20rpx;
}
.hot-goods-box .hot-goods .hot-goods-div p {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 28rpx;
  padding: 20rpx 0 0 20rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hot-goods-box .hot-goods .hot-goods-div .price {
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ff443d;
  line-height: 32rpx;
  padding: 20rpx 0 20rpx 0;
  display: block;
}
.hot-goods-box .hot-goods .hot-goods-div .price-sign {
  font-size: 12px;
  padding-left: 20rpx;
  color: #ff5f5f;
}
.hot-goods-box .hot-goods .hot-goods-div .goods-type-icon {
  width: auto;
  height: auto;
  padding: 8rpx 10rpx;
  background-color: red;
  border-top-right-radius: 20rpx;
  border-bottom-left-radius: 20rpx;
  color: #fff;
}
.hot-search-not {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hot-search-not i {
  font-size: 30px;
  padding: 40rpx 0;
}
.hot-search-not h2 {
  font-size: 20px;
}
</style>
