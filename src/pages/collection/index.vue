<template>
  <div class="collection">
    <div class="collection-null" v-if="isCollectionNull">
      <i class="iconfont iconno_result"></i>
      没有找到收藏的商品哦 ~
      <div @click="toIndex">去逛逛</div>
    </div>
    <div class="collections" v-if="!isCollectionNull">
      <div
        class="collection-box"
        v-for="(item,index) in collectionData"
        :key="index"
        @click="toGoodsDetails (item)"
      >
        <div class="collection-box-content">
          <div
            class="bg"
            :style="{
                  background: 'url('+item.coverList[0].url+') no-repeat center/cover'
                }"
          ></div>
          <div class="collection-box-content-right">
            <h3>{{item.goodsName}} {{item.goodsUnit}}</h3>
            <p>￥ {{item.goodsPrice}}</p>
            <span>库存量： {{item.goodsStock}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCollectionShop } from '@/api/collection'
import { changeQuerystringDetail, ENCODE } from '@/utils/function'
import { getGoodsDetail } from '@/api/goods'

export default {
  data () {
    return {
      isCollectionNull: false,
      collectionData: []
    }
  },
  onShow () {
    let value = wx.getStorageSync('userMegList')
    let data = {
      userId: value.id
    }
    this.collectionData = []
    this.getCollectionShopFun(data)
  },
  methods: {
    // 获取用户全部的收藏商品
    getCollectionShopFun (data) {
      let _this = this
      getCollectionShop('mini/getCollectionShop', data).then(res => {
        wx.hideLoading()
        if (res.data.data) {
          if (res.data.data.length === 0) {
            _this.isCollectionNull = true
          } else {
            _this.isCollectionNull = false
            for (let i = 0; i < res.data.data.length; i++) {
              let id = res.data.data[i].shopId
              _this.getGoodsDetailFun({ id })
            }
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
    // 获取商品详情接口
    getGoodsDetailFun (id) {
      let _this = this
      wx.showLoading({
        title: '加载中'
      })
      getGoodsDetail('goods/getGoodsDetail', id).then(res => {
        wx.hideLoading()
        if (res.data.data) {
          _this.collectionData.push(changeQuerystringDetail(res.data.data))
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 点击图片跳转到商品详情
    toGoodsDetails (item) {
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
    },
    // 去逛逛跳转到首页
    toIndex () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.switchTab({
        url: '/pages/index/main',
        success: function (res) {
          wx.hideToast()
        }
      })
    }
  }
}
</script>
<style lang="less"scoped>
.collection {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  border-top: 10rpx solid #f4f4f4;
}
.collections {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}
.collection .collection-null {
  width: 100%;
  height: 300rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 18px;
  margin-top: 100rpx;
}
.collection .collection-null i {
  font-size: 50px;
}
.collection .collection-null div {
  width: 120rpx;
  height: 60rpx;
  text-align: center;
  line-height: 60rpx;
  font-size: 16px;
  border: 1px solid #888;
}
.collection .collection-box {
  width: 100%;
  height: 230rpx;
  background-color: #fff;
  border-bottom: 10rpx solid #f4f4f4;
  display: flex;
  flex-direction: column;
}
.collection .collection-box .collection-box-content {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #f6f6f6;
  display: flex;
  align-items: center;
}
.collection .collection-box .collection-box-content .bg {
  width: 172rpx;
  height: 172rpx;
  border-radius: 12rpx;
  margin-left: 20rpx;
}
.collection
  .collection-box
  .collection-box-content
  .collection-box-content-right {
  width: auto;
  height: 172rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20rpx;
  h3 {
    width: 486rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 32rpx;
    margin-bottom: 20rpx;
  }
  p {
    font-size: 28rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ff443d;
    line-height: 28rpx;
    margin-bottom: 20rpx;
  }
  span {
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 24rpx;
  }
}
</style>
