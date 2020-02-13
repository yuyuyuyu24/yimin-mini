<template>
  <div class="page">
    <back-top v-if="isBack"></back-top>
    <div class="cattle-title">
      <h2>羊肉</h2>
      <p>指从羊身上获得的肉，为常见的肉品之一。</p>
    </div>
    <div class="cattle-goods-box">
      <div class="cattle-goods">
        <div v-for="(item,index) in sheepGoods" :key="index" @click="toDetails(item)">
          <image lazy-load=true mode="widthFile" :src='item.imgUrl'></image>
          <p>{{item.title}}</p>
          <span class="price"><span class="price-sign">￥</span>{{item.price}}<span class="price-unit">/500克</span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backTop from '@/components/backTop'
// 导入羊肉数据
import data from '@/utils/data.js'

export default {
  data () {
    return {
      sheepGoods: data.sheepData
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
    }
  }
}
</script>

<style scoped>
.cattle-title {
  width: 100%;
  height: 200rpx;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-bottom: 4rpx solid #f4f4f4;
}
.cattle-title h2 {
  font-size: 20px;
}
.cattle-title p {
  font-size: 14px;
  color: #777;
}
.cattle-goods-box {
  width: 100%;
  height: auto;
}
.cattle-goods-box .cattle-goods {
  width: 700rpx;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin: 20rpx auto;
}
.cattle-goods-box .cattle-goods div {
  width: 340rpx;
  height: 400rpx;
  border-radius: 8rpx;
  margin: 0 10rpx 10rpx 0;
  box-shadow: darkgrey 0 0 30rpx -10rpx;
}
.cattle-goods-box .cattle-goods div image {
  width: 100%;
  height: 70%;
  border-top-left-radius: 8rpx;
  border-top-right-radius: 8rpx;
}
.cattle-goods-box .cattle-goods div p {
  font-size: 16px;
  font-weight: 600;
  padding-left: 20rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.cattle-goods-box .cattle-goods div .price {
  font-size: 20px;
  padding-left: 20rpx;
  font-weight: 600;
  color: #ff5f5f;
}
.cattle-goods-box .cattle-goods div .price-sign {
  font-size: 14px;
  color: #ff5f5f;
}
.cattle-goods-box .cattle-goods div .price-unit {
  font-size: 14px;
  color: #222;
}
</style>
