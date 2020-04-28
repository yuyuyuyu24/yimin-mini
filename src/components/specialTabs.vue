<template>
  <div class="hot-goods-box">
    <div class="hot-goods">
      <div
        v-for="(item,index) in specialGoods"
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
        <div
          v-if="item.isSpecial === 1"
          class="hot-goods-div-message-right"
        >
          特价
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { querySpecialGoods } from '@/api/goods'
import { changeQuerystring, ENCODE } from '@/utils/function'

export default {
  props: ['specialGood'],
  data () {
    return {
      specialGoods: [],
      conut: 1
    }
  },
  mounted () {
    this.specialGoods = this.specialGood
    // this.querySpecialGoodsFun()
  },
  onReachBottom () {
    this.querySpecialGoodsFun()
  },
  methods: {
    // 获取特价商品 接口
    querySpecialGoodsFun () {
      let _this = this
      this.conut += 1
      let data = {
        isSpecial: 1,
        pageNumber: _this.conut,
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
          _this.specialGoods = _this.specialGoods.concat(changeQuerystring(res.data.data))
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
<style scoped>
.hot-goods-box {
  width: 100%;
  height: auto;
  margin: 25rpx 0;
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
