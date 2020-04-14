<template>
  <div class="page">
    <back-top v-if="isBack"></back-top>
    <div
      class="search-box"
      @click="toSearch"
    >
      <div class="search">
        <i class="iconfont iconsousuo-copy"></i>
        <p>{{query}}</p>
      </div>
    </div>
    <div class="search-res-box">
      <view
        class="no-search-res"
        v-if="searchResGoodsList.length === 0"
      >
        <i class="iconfont iconno_result"></i>
        <h2>暂时没有找到商品</h2>
      </view>
      <div class="search-res">
        <div
          class="search-res-goods"
          v-for="(item,index) in searchResGoodsList"
          :key="index"
          @click="toDetails(item)"
        >
          <div
            class="yishouqing"
            v-if="item.goodsStatus === 2"
          >已 售 罄
          </div>
          <image
            lazy-load=true
            mode="widthFile"
            :src='item.coverList.url'
          ></image>
          <p>{{item.goodsName}}</p>
          <span class="price"><span class="price-sign">￥</span>{{item.goodsPrice}}</span>
          <div
            v-if="item.isSpecial === 1"
            class="hot-goods-div-message-right"
          >
            特价
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backTop from '@/components/backTop'
// 导入全部数据
import data from '@/utils/data.js'
import { searchGoods } from '@/api/goods'
import { changeQuerystring, ENCODE } from '@/utils/function'

export default {
  data () {
    return {
      searchResGoods: data.allData,
      searchResGoodsList: [],
      query: ''
    }
  },
  components: {
    backTop
  },
  mounted () {
    // 取路由参数
    this.query = this.$root.$mp.query.search
    let goodsName = this.query
    this.searchGoodsFun({ goodsName })
  },

  onPageScroll (e) {
    if (e.scrollTop > this.GLOBAL.SCROLL_TOP) {
      this.isBack = true
    } else {
      this.isBack = false
    }
  },

  methods: {
    // 搜索商品接口 模糊查询
    searchGoodsFun (goodsName) {
      let _this = this
      wx.showLoading({
        title: '加载中'
      })
      searchGoods('goods/searchGoods', goodsName).then(res => {
        wx.hideLoading()
        if (res.data.data) {
          _this.searchResGoodsList = changeQuerystring(res.data.data)
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
    // 跳转至商品详情页面
    toDetails (item) {
      console.log(item)
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
.search-res-box {
  width: 100%;
  height: auto;
}
.search-res-box .no-search-res {
  width: 100%;
  margin: 100rpx auto;
  text-align: center;
}
.search-res-box .no-search-res i {
  font-size: 40px;
}
.search-res-box .no-search-res h2 {
  padding-top: 40rpx;
  font-size: 16px;
}
.search-res {
  width: 700rpx;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin: 20rpx auto;
}
.search-res-goods {
  width: 340rpx;
  height: 400rpx;
  border-radius: 8rpx;
  margin: 0 10rpx 10rpx 0;
  box-shadow: darkgrey 0 0 30rpx -10rpx;
  position: relative;
}
.search-res-goods .yishouqing {
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
.search-res-goods image {
  width: 100%;
  height: 70%;
  border-top-left-radius: 8rpx;
  border-top-right-radius: 8rpx;
}
.search-res-goods .hot-goods-div-message-right {
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

.search-res-goods p {
  font-size: 16px;
  font-weight: 600;
  padding-left: 20rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search-res-goods .price {
  font-size: 20px;
  padding-left: 20rpx;
  font-weight: 600;
  color: #ff5f5f;
}
.search-res-goods .price-sign {
  font-size: 14px;
  color: #ff5f5f;
}
.search-res-goods .price-unit {
  font-size: 14px;
  color: #222;
}
</style>
