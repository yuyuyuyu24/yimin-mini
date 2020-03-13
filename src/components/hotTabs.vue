<template>
  <div class="hot-goods-box">
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
</template>
<script>
import { queryHotGoods } from '@/api/goods'
import { changeQuerystring } from '@/utils/function'

export default {
  data () {
    return {
      hotGoods: []
    }
  },
  mounted () {
    this.queryHotGoodsFun()
  },
  methods: {
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
